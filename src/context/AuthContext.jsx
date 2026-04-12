import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const saveUser = (userData, token) => {
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

 
// ==================== LOGIN ====================
const login = async (data) => {
  try {
    const res = await API.post("/api/users/login", data);

    const loggedInUser = res.data.user || res.data;

    // Check if user is blocked
    if (loggedInUser?.isBlocked || loggedInUser?.blocked) {
      toast.error("Your account has been blocked. Please contact support.", {
        position: "top-center",
        autoClose: 8000,
      });
      throw new Error("Account blocked");
    }

    saveUser(loggedInUser, res.data.token);
    return res.data;

  } catch (error) {
    // Blocked account (from backend 403 or from our check above)
    if (error.response?.status === 403 || error.message === "Account blocked") {
      // Toast is already shown above, so we just re-throw
      throw new Error("Account blocked");
    }

    // // All other errors (invalid credentials, network error, etc.)
    // toast.error("Invalid credentials", {
    //   position: "top-center",
    //   autoClose: 5000,
    // });

    throw error;
  }
};

  
// ==================== GOOGLE LOGIN ====================
const googleAuth = async (token) => {
  try {
    const res = await API.post("/api/users/google", { token });

    const loggedInUser = res.data.user || res.data;

    if (loggedInUser?.isBlocked || loggedInUser?.blocked) {
      toast.error("Your account has been blocked. Please contact support.", {
        position: "top-center",
        autoClose: 8000,
      });
      throw new Error("Account blocked");
    }

    saveUser(loggedInUser, res.data.token);
    return res.data;

  } catch (error) {
    if (error.response?.status === 403 || error.message === "Account blocked") {
      throw new Error("Account blocked"); 
    }

    toast.error("Google login failed", {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
};

  // ==================== REGISTER ====================
  const register = async (data) => {
    try {
      const res = await API.post("/api/users/register", data);
      const newUser = res.data.user || res.data;
      const token = res.data.token;

      if (token && newUser) {
        saveUser(newUser, token);
      }

      return res.data;
    } catch (error) {
      const errorMsg =  "Registration failed";
      toast.error(errorMsg);
      throw error;
    }
  };

  // ==================== LOGOUT ====================
  const logout = async () => {
    try {
      await API.post("/api/users/logout");
    } catch (err) {
      console.warn("Backend logout failed");
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ==================== OTHER FUNCTIONS ====================
  const updateProfile = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");

    const res = await API.put("/api/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedUser = res.data.user || res.data;
    saveUser(updatedUser, token);
    return res.data;
  };

  const updatePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/users/change-password",
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  };

  const forgotPassword = async (email) => {
    const res = await API.post("/api/users/forgot-password", { email });
    return res.data;
  };

  const verifyOtp = async (email, otp) => {
    const res = await API.post("/api/users/verify-otp", { email, otp });
    return res.data;
  };

  const resendOtp = async (email) => {
    const res = await API.post("/api/users/resend-otp", { email });
    return res.data;
  };

  const resetPassword = async (email, otp, newPassword) => {
    const res = await API.post("/api/users/reset-password", {
      email,
      otp,
      newPassword,
    });
    return res.data;
  };

  const isAdmin = () => user?.role === "admin";

  const value = {
    user,
    saveUser,
    login,
    googleAuth,
    register,
    logout,
    updateProfile,
    updatePassword,
    forgotPassword,
    verifyOtp,
    resendOtp,
    resetPassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};