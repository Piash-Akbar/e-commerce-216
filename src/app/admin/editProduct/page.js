'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebase } from "../../context/firebase";
import { useParams } from "next/navigation";

const EditProduct = () => {
  

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
            <h1 className="text-3xl font-bold">Shows all my products</h1>
            <h2 className="text-2xl font-bold">And can be edited</h2>
        </div>
    );

};
export default EditProduct