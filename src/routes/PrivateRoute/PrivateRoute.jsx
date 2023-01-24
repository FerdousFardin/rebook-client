import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loadingState } = useContext(AuthContext);
  const location = useLocation();

  const loaders = Object.keys(loadingState);
  for (const loader of loaders) if (loadingState[loader]) return <Loader />;
  if (user?.uid) return <>{children}</>;
  else
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
}
