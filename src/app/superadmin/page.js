"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useFirebase } from "../context/firebase";
import Navbar from "../navbar.js/Navbar";

export default function AdminPage() {
  const { user, db } = useFirebase();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!db || !user) return;

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const usersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [db, user]);

  const updateRole = async (uid, role) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { role });
      setUsers(users.map(u => u.id === uid ? { ...u, role } : u));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (!user || !db) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (user.role !== "superadmin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
        <h1 className="text-4xl font-bold">You are not authorized to view this page.</h1>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left text-black">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 space-x-2">
                {u.role === "customer" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded hover:cursor-pointer"
                    onClick={() => updateRole(u.id, "admin")}
                  >
                    Make Admin
                  </button>
                )}
                {u.role === "admin" && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded hover:cursor-pointer"
                    onClick={() => updateRole(u.id, "customer")}
                  >
                    Demote
                  </button>
                )}
                {u.role === "superadmin" && (
                  <button
                    className="bg-gray-400 text-white font-bold py-1 px-3 rounded cursor-not-allowed"
                    disabled
                  >
                    Nothing to do
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
