import React from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const location = useLocation();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  // User not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Admin-only route
  if (
    adminOnly &&
    role !== "admin"
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;