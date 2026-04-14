import { createContext, useState, useEffect, useRef } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const shown = useRef(new Set());

  // ================= FETCH =================
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/api/notifications");
      const data = res.data || [];

      setNotifications(data);

      // show toast only for new unread ones
      data.forEach((n) => {
        if (!n.read && !shown.current.has(n._id)) {
          toast.info(n.message);
          shown.current.add(n._id);
        }
      });
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  };

  // ================= MARK AS READ =================
  const markAsRead = async (id) => {
    try {
      await API.put(`/api/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  // ================= INITIAL + REAL-TIME LOOP =================
  useEffect(() => {
    fetchNotifications();

    // 🔥 faster polling (better UX)
    const interval = setInterval(fetchNotifications, 15000); // 15s

    return () => clearInterval(interval);
  }, []);

  // ================= REFRESH ON TAB FOCUS =================
  useEffect(() => {
    const handleFocus = () => fetchNotifications();

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
