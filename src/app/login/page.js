"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebase } from "../context/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { loginWithEmailAndPassword } = useFirebase();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      await loginWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer">
          Log In
        </button>
        <p> Do not have an account? <a href="/signup" className="text-blue-500 hover:cursor-pointer">Sign Up</a></p>
      </form>
    </div>
  );
}
