import React from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const AdminUserModal = ({
  user,
  closeModal,
  onBlock,
  onUnblock,
  onMakeAdmin,
}) => {
  if (!user) return null;

  const isBlocked = user.isBlocked;
  const isAdmin = user.role === "admin";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg mx-auto overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold">User Details</h2>
          <MdCancel
            className="text-3xl cursor-pointer text-gray-500 hover:text-black"
            onClick={closeModal}
          />
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Profile */}
          <div className="flex items-center gap-4">
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt="profile"
              className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Role:</span>{" "}
              {user.role || "User"}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`font-medium ${
                  isBlocked ? "text-red-600" : "text-green-600"
                }`}
              >
                {isBlocked ? "Blocked" : "Active"}
              </span>
            </p>

            <p>
              <span className="font-medium">Total Tasks:</span>{" "}
              {user.totalTasks || 0}
            </p>

            <p>
              <span className="font-medium">Completed Tasks:</span>{" "}
              {user.completedTasks || 0}
            </p>

            <p>
              <span className="font-medium">Joined:</span>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t flex flex-col sm:flex-row gap-3">

          {/* 🔴 Block / Unblock */}
          {!isBlocked ? (
            <button
              onClick={() => {
                if (isAdmin) {
                  toast.error("You cannot block an admin");
                  return;
                }
                onBlock(user); // ✅ FIXED
                toast.success(`${user.name} blocked`);
                closeModal();
              }}
              className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-medium hover:bg-red-700 transition"
            >
              Block User
            </button>
          ) : (
            <button
              onClick={() => {
                onUnblock(user); // ✅ FIXED
                toast.success(`${user.name} unblocked`);
                closeModal();
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-medium hover:bg-green-700 transition"
            >
              Unblock User
            </button>
          )}

          {/* 🔵 Make Admin */}
          <button
            onClick={() => {
              if (isAdmin) return;
              onMakeAdmin(user); // ✅ FIXED
              toast.success(`${user.name} is now an admin`);
              closeModal();
            }}
            disabled={isAdmin}
            className={`flex-1 py-3 rounded-2xl font-medium transition ${
              isAdmin
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isAdmin ? "Already Admin" : "Make Admin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserModal;