'use client';
import { useFirebase } from "./context/firebase";
import Navbar from "./navbar.js/Navbar";

export default function HomePage() {

  const { logOut, user } = useFirebase();
  return (
    <>
    <Navbar />
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
