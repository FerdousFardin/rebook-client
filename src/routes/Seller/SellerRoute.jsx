import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import useSeller from "../../hooks/useSeller";

export default function SellerRoute({ children }) {
  const location = useLocation();
  const { user, loadingState } = useContext(AuthContext);
  const { checkingSeller, isSeller } = useSeller(user?.email);

  const loaders = Object.keys(loadingState);
  for (const loader of loaders)
    if (loadingState[loader] || checkingSeller) return <Loader />;

  if (user && isSeller) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace />;
}
