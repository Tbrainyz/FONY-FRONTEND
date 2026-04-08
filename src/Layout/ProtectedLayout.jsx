import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isBlocked) {
      toast.error("Your account has been blocked. Please contact support.", {
        position: "top-center",
        autoClose: 6000,
      });

      logout(); // Clear local storage
      navigate("/login", { replace: true }); // Force redirect
    }
  }, [user, logout, navigate]);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Blocked user - Don't render anything
  if (user.isBlocked) {
    return null;
  }

  // Normal user
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;