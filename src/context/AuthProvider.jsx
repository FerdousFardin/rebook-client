import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user === null) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signupUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logoutUser = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("rebookToken");
    signOut(auth)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {});
  };
  const updateInfo = (displayName) => {
    updateProfile(auth?.currentUser, {
      displayName,
    })
      .then(() => {
        toast.success("Profile updated.");
      })
      .catch(() => {
        toast.error(`Profile couldn't be updated.`);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        loginUser,
        signupUser,
        updateInfo,
        googleLogin,
        logoutUser,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
}
