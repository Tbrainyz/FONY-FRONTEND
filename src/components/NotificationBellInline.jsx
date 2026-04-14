import { useContext, useState, useRef, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationBellInline = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 🔔 ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative p-2 rounded-xl
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition
        "
      >
        <IoNotificationsOutline className="text-xl text-gray-700 dark:text-gray-300" />

        {/* BADGE */}
        {unreadCount > 0 && (
          <span className="
            absolute -top-1 -right-1
            bg-red-500 text-white text-[10px]
            px-1.5 py-[2px]
            rounded-full
          ">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="
          absolute right-0 mt-3 w-80 max-h-[400px] overflow-y-auto
          backdrop-blur-xl bg-white/90 dark:bg-gray-900/90
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-xl z-50
        ">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-center text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={`
                  p-3 border-b text-sm cursor-pointer transition
                  ${!n.read ? "bg-gray-100 dark:bg-gray-800" : ""}
                  hover:bg-gray-200 dark:hover:bg-gray-700
                `}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBellInline;
