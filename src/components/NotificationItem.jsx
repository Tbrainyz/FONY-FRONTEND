import { IoClose } from "react-icons/io5";

const NotificationItem = ({ n, markAsRead, deleteNotification }) => {
  return (
    <div className="px-4 py-3 text-sm border-b flex justify-between gap-3 hover:bg-gray-100">

      {/* MESSAGE */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => markAsRead(n._id)}
      >
        <p>{n.message}</p>

        {n.createdAt && (
          <p className="text-[10px] text-gray-400">
            {new Date(n.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* DELETE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteNotification(n._id);
        }}
        className="text-gray-400 hover:text-red-500"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default NotificationItem;
