import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (data) => {
    try {
      const res = await API.post("/users/login", data, { withCredentials: true });
      const loggedInUser = res.data.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  // ✅ REGISTER
  const register = async (data) => {
    const res = await API.post("/users/register", data);
    return res.data;
  };

  // ✅ GOOGLE AUTH
  const googleAuth = async (data) => {
    const res = await API.post("/users/google", { token: data.token });
    const googleUser = res.data.user;
    setUser(googleUser);
    localStorage.setItem("user", JSON.stringify(googleUser));
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ UPDATE PROFILE
  const updateProfile = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");
    const res = await API.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedUser = res.data.user;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return res.data;
  };

  // ✅ FORGOT PASSWORD
  const forgotPassword = async (email) => {
    const res = await API.post("/users/forgot-password", { email });
    return res.data;
  };

  // ✅ RESEND OTP
  const resendOtp = async (email) => {
    const res = await API.post("/users/resend-otp", { email });
    return res.data;
  };

  // ✅ RESET PASSWORD
  const resetPassword = async (email, otp, newPassword) => {
    const res = await API.post("/users/reset-password", { email, otp, newPassword });
    return res.data;
  };

  // ✅ HELPER: CHECK ADMIN
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
