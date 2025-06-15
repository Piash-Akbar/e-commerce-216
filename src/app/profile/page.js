"use client";

import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navbar from "../navbar.js/Navbar";

export default function ProfilePage() {
  const { user, db, auth } = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.displayName || "");
    setEmail(user.email || "");
    setPhotoURL(user.photoURL || "");
  }, [user]);

  const handleProfileUpdate = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });

      // Optional: Update Firestore user document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
      });

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    }
    setIsSaving(false);
  };

  const handlePasswordChange = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters.");
        setIsSaving(false);
        return;
      }
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to change password. Re-authentication may be required.");
    }
    setIsSaving(false);
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to view your profile.</div>;
  }

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="flex justify-center mb-6">
        <img
          src={photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block  text-sm font-medium">Email (read-only)</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 text-black border rounded bg-gray-100"
          />
        </div>

        <button
          onClick={handleProfileUpdate}
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Update Profile"}
        </button>

        <hr className="my-6" />

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
        //   onClick={handlePasswordChange}
        onClick={()=>alert("Under Construction")}
          disabled={isSaving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-not-allowed hover:bg-green-700"
        >
          {isSaving ? "Changing..." : "Change Password"}
        </button>

        {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
      </div>
    </div>
    </>
  );
}
