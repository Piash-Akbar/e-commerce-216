"use client";

import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase"; // custom auth & Firestore hook
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import LoadingSpinner from "../loading/LoadingSpinner";
import Navbar from "../navbar.js/Navbar";

export default function MyOrders() {
  const { user, db } = useFirebase();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("orderedBy", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, db]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Please login to see your orders.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You have no orders yet.
      </p>
    );
  }

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        My Orders
      </h1>
      <ul className="space-y-4">
        {orders.map(({ id, items, confirmationStatus, createdAt }) => {
          const status =
            typeof confirmationStatus === "string" && confirmationStatus.trim()
              ? confirmationStatus
              : "unknown";

          return (
            <li
              key={id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  Order ID: <code>{id}</code>
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "approved"
                      ? "bg-green-100 text-green-800"
                      : status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Ordered on:{" "}
                {createdAt?.toDate
                  ? createdAt.toDate().toLocaleString()
                  : new Date(createdAt).toLocaleString()}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {items?.map((item, idx) => (
                  <li key={idx}>
                    {item.productName} — Qty: {item.quantity || 1} — Price: $
                    {item.price}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
}
