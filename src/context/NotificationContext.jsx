// import {
//   createContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import API from "../api/axios";
// import { toast } from "react-toastify";

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const shown = useRef(new Set());

//   // ================= FETCH =================
//   const fetchNotifications = useCallback(async () => {
//     try {
//       const res = await API.get("/api/notifications");
//       const data = res.data || [];

//       setNotifications(data);

//       // prevent toast spam
//       data.forEach((n) => {
//         if (!n.read && !shown.current.has(n._id)) {
//           toast.info(n.message);
//           shown.current.add(n._id);
//         }
//       });
//     } catch (err) {
//       console.error("Fetch notifications error:", err);
//     }
//   }, []);

//   // ================= MARK AS READ =================
//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) =>
//         prev.map((n) =>
//           n._id === id ? { ...n, read: true } : n
//         )
//       );

//       await API.put(`/api/notifications/${id}/read`);
//     } catch (err) {
//       console.error("Mark as read error:", err);
//     }
//   };

//   // ================= DELETE NOTIFICATION =================
//   const deleteNotification = async (id) => {
//     try {
//       // optimistic UI
//       setNotifications((prev) =>
//         prev.filter((n) => n._id !== id)
//       );

//       await API.delete(`/api/notifications/${id}`);

//       // 🔥 force sync to avoid ghost reappearance
//       await fetchNotifications();
//     } catch (err) {
//       console.error("Delete notification error:", err);
//     }
//   };

//   // ================= CLEAR ALL =================
//   const clearAllNotifications = async () => {
//     try {
//       setNotifications([]);

//       await API.delete("/api/notifications");

//       await fetchNotifications();
//     } catch (err) {
//       console.error("Clear all error:", err);
//     }
//   };

//   // ================= INITIAL LOAD =================
//   useEffect(() => {
//     fetchNotifications();

//     const interval = setInterval(fetchNotifications, 15000);
//     return () => clearInterval(interval);
//   }, [fetchNotifications]);

//   // ================= ON FOCUS REFRESH =================
//   useEffect(() => {
//     const handleFocus = () => fetchNotifications();

//     window.addEventListener("focus", handleFocus);
//     return () => window.removeEventListener("focus", handleFocus);
//   }, [fetchNotifications]);

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         fetchNotifications,
//         markAsRead,
//         deleteNotification,
//         clearAllNotifications,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };
