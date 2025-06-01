"use client"

import { useEffect } from "react"
import { useFirebase } from "../context/firebase"
import Link from "next/link"


export default function DeleteBtn({ product }) {
    const { handleDelete } = useFirebase()



    return (
        <button
            onClick={() => {handleDelete(product.id)}}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
            Delete
        </button>
    )
}