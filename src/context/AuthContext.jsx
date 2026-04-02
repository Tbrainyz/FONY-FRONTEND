import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";   // Make sure this has withCredentials: true

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ==================== LOGIN ====================
  const login = async (data) => {
    try {
      const res = await API.post("/users/login", data);   // withCredentials is already in axios

      const loggedInUser = res.data.user || res.data;

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Only store token if your backend actually returns one (JWT)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  // ==================== REGISTER ====================
  const register = async (data) => {
    const res = await API.post("/users/register", data);
    return res.data;
  };

  // ==================== GOOGLE AUTH ====================
 // ==================== GOOGLE AUTH ====================
const googleAuth = async (data) => {
  try {
    const res = await API.post("/users/google", { token: data.token });

    const googleUser = res.data.user || res.data;
    setUser(googleUser);
    localStorage.setItem("user", JSON.stringify(googleUser));

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    throw error;
  }
};
  // ==================== LOGOUT ====================
  const logout = async () => {
    try {
      // Optional: Call backend logout to clear session cookie
      await API.post("/users/logout");
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
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image) formData.append("image", data.image);

    const res = await API.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Remove Authorization header if using sessions (cookies)
        // Authorization: `Bearer ${token}`  ← Comment this out for now
      },
    });

    const updatedUser = res.data.user || res.data;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return res.data;
  };

  // ==================== OTHER METHODS ====================
  const forgotPassword = async (email) => {
    const res = await API.post("/users/forgot-password", { email });
    return res.data;
  };

  const resendOtp = async (email) => {
    const res = await API.post("/users/resend-otp", { email });
    return res.data;
  };

  const resetPassword = async (email, otp, newPassword) => {
    const res = await API.post("/users/reset-password", { email, otp, newPassword });
    return res.data;
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleAuth,
        logout,
        updateProfile,
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