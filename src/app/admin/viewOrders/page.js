'use client'

export default function ViewOrders() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
            <h1 className="text-3xl font-bold">Shows all my orders</h1>
            <h2 className="text-2xl font-bold ">
                <div className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-green-500 transition hover:cursor-pointer">Confirm</div>
                <p>Or,</p>
                <div className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-red-500 transition hover:cursor-pointer">Decline</div>
            </h2>
        </div>
    )
}