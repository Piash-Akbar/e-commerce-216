"use client";
import { useEffect, useState } from "react";
import { useFirebase } from "./context/firebase";
import Navbar from "./navbar.js/Navbar";
import Card from "./card/Card";
import Slider from "./slider/Slider";

export default function HomePage() {
  const { logOut, user, handleGetAllProducts,products } = useFirebase();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  console.log("Products:", products);
  //Data for slider
  const srcs = [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://ix-www.imgix.net/case-study/shinola/shinola_4.png?ixlib=js-3.8.0&auto=format%2Ccompress&q=70&fit=crop&crop=top&pad=16&border=16%2Ce8f0f4&w=1075",
    "https://ix-www.imgix.net/case-study/shinola/shinola_2.png?ixlib=js-3.8.0&auto=format%2Ccompress&q=70&fit=crop&crop=top&pad=16&border=16%2Ce8f0f4&w=1075",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  ];



  return (
    <>
      <Navbar />
      <Slider srcs={srcs}/>
      <div className="flex flex-wrap justify-around items-center bg-gray-100 pt-10 text-black">
        {products.map((product, id) => (
          <Card key={id} product={{ ...product, imageUrl: "https://cdn.mos.cms.futurecdn.net/kbrdKHwjXBwSp9uiY8hejP-1200-80.jpg"}} />
        ))};
      </div>



      <div className="flex flex-wrap justify-around items-center bg-gray-100 text-black">
        {products.map((product, id) => (
            <Card key={id} product={{ ...product, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZX5ASHgJXuvxGmtW2kmm1ojYX0BewY8dOL2gIZNy7J3_eC1kDnl0KZhZwHDmo-TL4dM&usqp=CAU"}} />
        ))}

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
