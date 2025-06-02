
'use client';

import { useParams } from "next/navigation";
import Navbar from "@/app/navbar.js/Navbar";


export default function ViewOrderDetails() {

    const id = useParams();
    return (
        <>
        <Navbar />
        <div className="m-10">
            <h1>ViewOrders</h1>
            <p>{id.id}</p>
        </div>
        </>
    );
}