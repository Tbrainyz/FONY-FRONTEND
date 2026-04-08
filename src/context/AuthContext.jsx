import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

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

    if (loggedInUser?.blocked || loggedInUser?.isBlocked) {
      toast.error("Your account has been blocked. Please contact support.", {
        position: "top-center",
        autoClose: 8000,
      });
      throw new Error("Account blocked");
    }

    saveUser(loggedInUser, res.data.token);
    return res.data;

  } catch (error) {
    console.log("Login error details:", error.response?.data); // for debugging

    if (error.response?.status === 403) {
      const blockedMsg = error.response?.data?.message || 
                        "Your account has been blocked. Please contact support.";

      toast.error(blockedMsg, {
        position: "top-center",
        autoClose: 8000,
      });
      throw new Error("Account blocked");
    }

    // Normal errors (wrong password, user not found, etc.)
    const errorMsg = error.response?.data?.message || "Invalid credentials";
    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 5000,
    });

    throw error;
  }
};

  // ==================== GOOGLE LOGIN ====================
// ==================== GOOGLE LOGIN ====================
const googleAuth = async (token) => {
  try {
    const res = await API.post("/api/users/google", { token });

    const loggedInUser = res.data.user || res.data;

    if (loggedInUser?.blocked || loggedInUser?.isBlocked) {
      toast.error("Your account has been blocked. Please contact support.", {
        position: "top-center",
        autoClose: 6000,
      });
      throw new Error("Account blocked");
    }

    saveUser(loggedInUser, res.data.token);
    return res.data;

  } catch (error) {
    if (error.response?.status === 403) {
      toast.error(
        error.response?.data?.message || "Your account has been blocked. Please contact support.",
        { position: "top-center", autoClose: 8000 }
      );
      throw new Error("Account blocked");
    }

    toast.error(error.response?.data?.message || "Google login failed");
    throw error;
  }
};

  // ==================== REGISTER ====================
  const register = async (data) => {
    const res = await API.post("/api/users/register", data);
    return res.data;
  };

  // ==================== LOGOUT ====================
  const logout = async () => {
    try {
      await API.post("/api/users/logout");
    } catch (err) {
      console.warn("Backend logout failed, clearing local only");
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ==================== UPDATE PROFILE ====================
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

  // ==================== CHANGE PASSWORD ====================
  const updatePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/users/change-password",
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  };

  // ==================== PASSWORD RESET FLOW ====================
  const forgotPassword = async (email) => {
    const res = await API.post("/api/users/forgot-password", { email });
    return res.data;
  };

  // NEW: Verify OTP (This was missing!)
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
    verifyOtp,        // ← Added
    resendOtp,
    resetPassword,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};