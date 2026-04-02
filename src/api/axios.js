import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Now: https://fony-backend.onrender.com
  withCredentials: true, // ← Critical for cookies & sessions
  timeout: 10000,
});

// Attach token if you're using JWT (optional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
