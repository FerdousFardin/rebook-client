import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { isAdmin, checkingAdmin } = useAdmin(user?.email);
  if (loading || checkingAdmin) return  <SpinnerCircular  />
  if (user && isAdmin) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace />;
}
