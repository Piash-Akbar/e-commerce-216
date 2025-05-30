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

  // Create user profile with default role
  const createUserProfile = async (user, role = "customer") => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || "",
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
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
