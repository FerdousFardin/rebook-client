import React, { createContext, useEffect, useReducer, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialState = {
    googleLoading: false,
    emailLoading: false,
    registerLoading: false,
    anonymousLoading: false,
    logoutLoading: false,
  };
  const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GOOGLE_ON":
        return { ...state, googleLoading: true };
      case "GOOGLE_OFF":
        return { ...state, googleLoading: false };
      case "LOGIN_ON":
        return { ...state, emailLoading: true };
      case "LOGIN_OFF":
        return { ...state, emailLoading: false };
      case "REGISTER_ON":
        return { ...state, registerLoading: true };
      case "REGISTER_OFF":
        return { ...state, registerLoading: false };
      case "LOGOUT_ON":
        return { ...state, logoutLoading: true };
      case "LOGOUT_OFF":
        return { ...state, logoutLoading: false };
      case "A_ON":
        return { ...state, anonymousLoading: true };
      case "A_OFF":
        return { ...state, anonymousLoading: false };
      case "RESET":
        return state;
    }
  };
  const [loadingState, dispatch] = useReducer(loadingReducer, initialState);
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user === null) {
        setUser(currentUser);
      }
      dispatch({ type: "RESET" });
    });

    return () => unsubscribe();
  }, []);
  const loginUser = (email, password) => {
    dispatch({ type: "LOGIN_ON" });
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signupUser = (email, password) => {
    dispatch({ type: "REGISTER_ON" });
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    dispatch({ type: "GOOGLE_ON" });
    return signInWithPopup(auth, googleProvider);
  };
  const loginAnonymously = () => {
    dispatch({ type: "A_ON" });
    return signInAnonymously(auth);
  };
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_ON" });
    setUser(null);
    localStorage.removeItem("rebookToken");
    signOut(auth).finally(() => {
      dispatch({ type: "LOGOUT_OFF" });
    });
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
        loadingReducer,
        dispatch,
        loadingState,
        loginUser,
        loginAnonymously,
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
