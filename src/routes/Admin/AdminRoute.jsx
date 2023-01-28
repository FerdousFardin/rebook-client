import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const { user, loadingState } = useContext(AuthContext);
  const { isAdmin, checkingAdmin } = useAdmin(user?.email);
  const loaders = Object.keys(loadingState);
  for (const loader of loaders)
    if (loadingState[loader] || checkingAdmin)
      return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (user && isAdmin) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace />;
}
