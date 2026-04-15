import { useContext, useState, useRef, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationBellInline = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <IoNotificationsOutline className="text-xl text-gray-700 dark:text-gray-200" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 max-h-[400px] overflow-y-auto rounded-2xl shadow-xl z-50
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
        ">

          {/* HEADER */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Notifications
            </p>
          </div>

          {/* EMPTY STATE */}
          {notifications.length === 0 ? (
            <p className="p-6 text-sm text-center text-gray-500 dark:text-gray-400">
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={`
                  px-4 py-3 text-sm cursor-pointer transition border-b
                  border-gray-100 dark:border-gray-800
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  ${!n.read ? "bg-gray-50 dark:bg-gray-800/60" : ""}
                  text-gray-800 dark:text-gray-200
                `}
              >
                <p className="leading-snug">{n.message}</p>

                {/* optional time hint if you later add createdAt */}
                {n.createdAt && (
                  <p className="text-[10px] mt-1 text-gray-400 dark:text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBellInline;
