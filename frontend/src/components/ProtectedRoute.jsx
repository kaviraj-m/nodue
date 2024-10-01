// src/components/ProtectedRoute.js

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth.user);

  return auth ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
