import React from "react";
import { MdCancel } from "react-icons/md";

const AdminUserModal = ({ user, closeModal, onBlock, onUnblock, onMakeAdmin }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">User Details</h2>
          <MdCancel
            className="text-2xl cursor-pointer text-gray-600 hover:text-black"
            onClick={closeModal}
          />
        </div>

        {/* User Info */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt="profile"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>

          <p><span className="font-medium">Role:</span> {user.role || "User"}</p>
          <p><span className="font-medium">Total Tasks:</span> {user.totalTasks || 0}</p>
          <p><span className="font-medium">Completed Tasks:</span> {user.completedTasks || 0}</p>
          <p><span className="font-medium">Joined:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => { onBlock(user); closeModal(); }}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Block
          </button>
          <button
            onClick={() => { onUnblock(user); closeModal(); }}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Unblock
          </button>
          <button
            onClick={() => { onMakeAdmin(user); closeModal(); }}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Make Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserModal;
