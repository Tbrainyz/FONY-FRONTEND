import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000, // ⏱️ increased timeout (helps slow server / Render cold start)
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    console.log("AXIOS ERROR:", error.response || error.message);

    // ================= 🔴 AUTH HANDLING =================
    if (status === 401) {
      // Only logout for real auth issues
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // ================= 🔴 BLOCKED USER =================
    if (status === 403 && message?.toLowerCase().includes("blocked")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login?blocked=true";
    }

    // ================= ⚡ RETRY ON SERVER DELAY =================
    const config = error.config;

    if (
      error.code === "ECONNABORTED" || // timeout
      error.message.includes("Network Error")
    ) {
      if (!config._retry) {
        config._retry = true;

        console.warn("🔁 Retrying request...");

        return api(config); // retry once
      }
    }

    return Promise.reject(error);
  }
);

export default api;