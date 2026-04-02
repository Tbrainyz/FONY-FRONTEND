import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const saveUser = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ==================== LOGIN ====================
  const login = async (data) => {
    const res = await API.post("/api/users/login", data);
    const loggedInUser = res.data.user || res.data;

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  };

  // ==================== GOOGLE LOGIN ====================
  const googleAuth = async (token) => {
    const res = await API.post("/api/users/google", { token });
    const loggedInUser = res.data.user || res.data;

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
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
    } catch {
      console.warn("Backend logout failed, clearing local only");
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ==================== UPDATE PROFILE ====================
  const updateProfile = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");

    const res = await API.put("/api/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedUser = res.data.user || res.data;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return res.data;
  };

  // ==================== CHANGE PASSWORD ====================
  const updatePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/users/change-password",
      { oldPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  // ==================== OTHER METHODS ====================
  const forgotPassword = async (email) => {
    const res = await API.post("/api/users/forgot-password", { email });
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

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUser,
        login,
        googleAuth,
        register,
        logout,
        updateProfile,
        updatePassword,
        forgotPassword,
        resendOtp,
        resetPassword,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};