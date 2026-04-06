import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 25000,           // Increased to 25 seconds (Render cold start can take 15-40s)
});

// Request Interceptor
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

// Response Interceptor - Improved for Render
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.log("❌ API Error:", {
      status,
      url: originalRequest?.url,
      message,
      code: error.code,
    });

    // ================= AUTH ERRORS =================
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Prevent infinite redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // ================= BLOCKED USER =================
    if (status === 403 && message?.toLowerCase().includes("blocked")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login?blocked=true";
      return Promise.reject(error);
    }

    // ================= RETRY LOGIC FOR COLD START / NETWORK ISSUES =================
    if (
      (status === undefined || status >= 500 || error.code === "ECONNABORTED") &&
      !originalRequest._retry &&
      // Only retry GET requests or safe methods to avoid duplicate actions
      (originalRequest.method === "get" || originalRequest.method === "GET")
    ) {
      originalRequest._retry = true;

      console.warn(`🔄 Retrying request to ${originalRequest.url}...`);

      // Add small delay before retry (helps during server wake-up)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return api(originalRequest);
    }

    // ================= FINAL ERROR HANDLING =================
    return Promise.reject(error);
  }
);

export default api;