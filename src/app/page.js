"use client";
import { useEffect, useState } from "react";
import { useFirebase } from "./context/firebase";
import Navbar from "./navbar.js/Navbar";
import Card from "./card/Card";
import Slider from "./slider/Slider";
import LoadingSpinner from "./loading/LoadingSpinner";

export default function HomePage() {
  const { logOut, user, handleGetAllProducts,products } = useFirebase();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  console.log("Products:", products);
  //Data for slider
  // const srcs = [
  //   "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  //   "https://ix-www.imgix.net/case-study/shinola/shinola_4.png?ixlib=js-3.8.0&auto=format%2Ccompress&q=70&fit=crop&crop=top&pad=16&border=16%2Ce8f0f4&w=1075",
  //   "https://ix-www.imgix.net/case-study/shinola/shinola_2.png?ixlib=js-3.8.0&auto=format%2Ccompress&q=70&fit=crop&crop=top&pad=16&border=16%2Ce8f0f4&w=1075",
  //   "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  // ];

  const srcs = [
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fit=crop&w=800",
    // "https://images.pexels.com/photos/210590/pexels-photo-210590.jpeg",
    "https://images.pexels.com/photos/11926063/pexels-photo-11926063.jpeg"
  ];
  
  



  return (
    <>
      <Navbar />
      {products.length === 0 ? <LoadingSpinner /> :
      
      <>
      <Slider srcs={srcs}/>
      <div className="flex flex-wrap justify-around items-center bg-gray-100 pt-10 text-black">
        {products.map((product, id) => (
          <Card key={id} product={product} />
        ))}
      </div>
      </>
      }



      <div className="flex flex-wrap -mx-2 justify-around items-center bg-gray-100 text-black">
        {products.map((product, id) => (
            <Card key={id} product={product} />
        ))};

      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome to MyStore</h1>
          {user && (
            <>
              <p className="text-lg mb-2">You are logged in as: {user.email}</p>
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
