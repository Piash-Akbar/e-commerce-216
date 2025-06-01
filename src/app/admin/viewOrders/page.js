"use client";

import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../../context/firebase";

const ViewOrders = () => {
  const { user, db } = useFirebase();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdersWithMyProducts = async () => {
    try {
      // Optional: or do this in client if no API
      const { getDocs, collection } = await import("firebase/firestore");

      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const allOrders = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter orders that include items added by me
      const relevantOrders = allOrders.filter(order =>
        order.items?.some(item => item.addedBy === user?.uid)
      );

      setMyOrders(relevantOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        confirmationStatus: status,
      });
      fetchOrdersWithMyProducts(); // refresh
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrdersWithMyProducts();
    }
  }, [user]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders Containing Your Products</h1>

      {myOrders.length === 0 ? (
        <p>No orders found that include your products.</p>
      ) : (
        myOrders.map(order => (
          <div
            key={order.id}
            className="border p-4 mb-4 rounded-md shadow-sm"
          >
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black" onClick={() => window.location.href = `/admin/viewOrder/${order.id}`}>View Order Details</button>
            <h2 className="text-lg font-semibold mb-2">Order ID: {order.id}</h2>
            <p>Status: <span className="font-medium">{order.confirmationStatus}</span></p>
            <p>Total: ${order.totalAmount}</p>

            <h3 className="mt-3 font-semibold">Your Items:</h3>
            <ul className="list-disc pl-6">
              {order.items
                .filter(item => item.addedBy === user.uid)
                .map(item => (
                  <li key={item.id}>
                    {item.productName} (x{item.quantity}) – ${item.price}
                  </li>
                ))}
            </ul>

            {order.confirmationStatus == "Pending" && (
              

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateOrderStatus(order.id, "Confirmed")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "Declined")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
            )}
                <p>Confirmation Status: <b>{order.confirmationStatus}</b></p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewOrders;


























// export default function ViewOrders() {
//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
//             <h1 className="text-3xl font-bold">Shows all my orders</h1>
//             <h2 className="text-2xl font-bold ">
//                 <div className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-green-500 transition hover:cursor-pointer">Confirm</div>
//                 <p>Or,</p>
//                 <div className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-red-500 transition hover:cursor-pointer">Decline</div>
//             </h2>
//         </div>
//     )
// }