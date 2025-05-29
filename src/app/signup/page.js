"use client";

import { useState } from "react";
import { useFirebase } from "../context/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signupWithEmailAndPassword, signupWithGoogle,createUserProfile } = useFirebase();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signupWithEmailAndPassword(email, password);
      
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signupWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
        >
          Sign Up
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        className="w-full max-w-sm bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Sign Up with Google
      </button>
    </div>
  );
}
