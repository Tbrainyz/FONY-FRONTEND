import { useContext, useState, useRef, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationBellInline = () => {
  const {
    notifications,
    markAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useContext(NotificationContext);

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const unreadCount = unread.length;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const renderItem = (n) => (
    <div
      key={n._id}
      className={`px-4 py-3 flex gap-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 ${
        !n.read ? "bg-gray-50 dark:bg-gray-800/50" : ""
      }`}
    >
      {/* MESSAGE */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => markAsRead(n._id)}
      >
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {n.message}
        </p>

        <p className="text-[10px] text-gray-400 mt-1">
          {n.createdAt
            ? new Date(n.createdAt).toLocaleString()
            : ""}
        </p>
      </div>

      {/* DELETE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteNotification(n._id);
        }}
        className="text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      {/* BELL */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <IoNotificationsOutline className="text-xl text-gray-700 dark:text-gray-200" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 max-h-[450px] overflow-hidden rounded-2xl shadow-2xl z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">

          {/* HEADER */}
          <div className="px-4 py-3 flex justify-between items-center border-b">
            <p className="text-sm font-semibold">Notifications</p>

            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Clear all
              </button>
            )}
          </div>

          {/* BODY */}
          <div className="max-h-[380px] overflow-y-auto">

            {notifications.length === 0 ? (
              <p className="p-6 text-sm text-center text-gray-500">
                No notifications yet
              </p>
            ) : (
              <>
                {/* UNREAD */}
                {unread.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-[11px] text-gray-400 uppercase">
                      New
                    </p>
                    {unread.map(renderItem)}
                  </>
                )}

                {/* READ */}
                {read.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-[11px] text-gray-400 uppercase">
                      Earlier
                    </p>
                    {read.map(renderItem)}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBellInline;
