'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/app/context/firebase';
import Navbar from '@/app/navbar.js/Navbar';
import AdminCard from '../../card/AdminCard';

export default function MyBooksPage() {
  const { user, db, fetchMyProducts } = useFirebase();
  const [myProducts, setMyProducts] = useState([]);

  // Fetch only the user's added products
  useEffect(() => {
    if (!user?.uid) return;
  
    const fetchData = async () => {
      const products = await fetchMyProducts(user.uid); // ✅ wait for data
      setMyProducts(products); // ✅ now products is real data
      console.log("Fetched user's products:", products);
    };
  
    fetchData();
  }, [user]);
  

  




  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {myProducts.map((product) => (
          <AdminCard
            key={product.createdAt}
            product={product}
            // onUpdateProduct={handleUpdateProduct}
          />
        ))}
      </div>
    </>
  );
}
