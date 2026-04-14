import { createContext, useState, useEffect, useRef } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const shown = useRef(new Set()); // prevent duplicate toasts

  // ================= FETCH =================
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/api/notifications");
      setNotifications(res.data || []);
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

  // ================= TOAST NEW NOTIFICATIONS =================
  useEffect(() => {
    notifications.forEach((n) => {
      if (!n.read && !shown.current.has(n._id)) {
        toast.info(n.message);
        shown.current.add(n._id);
      }
    });
  }, [notifications]);

  // ================= AUTO REFRESH =================
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // every 1 min

    return () => clearInterval(interval);
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
