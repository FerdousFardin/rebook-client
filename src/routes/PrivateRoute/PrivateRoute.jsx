import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { AuthContext } from "../../context/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <SpinnerCircular enabled={loading} />;
  if (user?.uid) return <>{children}</>;
  else
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
}
