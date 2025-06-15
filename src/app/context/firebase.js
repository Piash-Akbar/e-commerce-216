"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  onSnapshot,
  or,

} from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Create context
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  // Create user profile with default role
  const createUserProfile = async (user, role = "customer") => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        role,
      });
    }
  };

  // Auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = docSnap.data();
          setUser({
            ...firebaseUser,
            role: userData?.role || "customer",
          });
        } catch (err) {
          console.error("Error fetching user role:", err);
          setUser({ ...firebaseUser, role: "customer" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth functions
  const signupWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user);
  };

  const loginWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    await createUserProfile(userCredential.user);
  };

  const logOut = async () => {
    await signOut(auth);
  };


  //Put data in firebase (Goes here)
  const handleCreateNewListing = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: serverTimestamp(),
        addedBy: user.uid,
        email: user.email,
        creator: user.displayName || "",

      });
      console.log("Product added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  //Fetch all data from firebase (Goes here)
  const handleGetAllProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  //Fetch Individual data using id from firebase (Goes here)
  const handleGetProductById = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      const docSnap = await getDoc(productRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }



  //Fetch products added by admin
  const fetchMyProducts = async (uid) => {
    if (!uid) return [];
  
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("addedBy", "==", uid));
      const snapshot = await getDocs(q);
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return productsList; // ✅ return data
    } catch (error) {
      console.error("Error fetching user's products:", error);
      return [];
    }
  };

  
  const updateMyProducts = async (db, id, productData) => {
    if (!id) return;
  
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { ...productData });
      // You can optionally return something
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
    

  const handleDelete = async (id) => {
    if (!id || !user) return;
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
  
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted.");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const placeOrder = async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...orderData,
        orderedBy: user.uid, // Add this
        createdAt: serverTimestamp(),
        confirmationStatus: "Pending",
      });
      console.log("Order placed with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  

  const viewOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const snapshot = await getDocs(ordersRef);
      const ordersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        auth,
        db,
        storage,
        signupWithEmailAndPassword,
        loginWithEmailAndPassword,
        signupWithGoogle,
        logOut,
        createUserProfile,
        handleCreateNewListing,
        handleGetAllProducts,
        products,
        handleGetProductById,
        fetchMyProducts,
        myProducts,
        updateMyProducts,
        handleDelete,
        placeOrder,
        viewOrders
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
