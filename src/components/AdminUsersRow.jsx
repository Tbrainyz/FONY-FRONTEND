import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";
import axios from "axios";
import { toast } from "react-toastify";   // ✅ Toastify import
import "react-toastify/dist/ReactToastify.css";

const AdminUsersRow = ({ user, index }) => {
  const [showModal, setShowModal] = useState(false);

  // ✅ Backend handlers with toastify
  const handleBlock = async (user) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/block/${user._id}`);
      toast.success(`${user.name} has been blocked`);
    } catch (err) {
      console.error("Block error:", err.response?.data || err.message);
      toast.error("Failed to block user");
    }
  };

  const handleUnblock = async (user) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/unblock/${user._id}`);
      toast.success(`${user.name} has been unblocked`);
    } catch (err) {
      console.error("Unblock error:", err.response?.data || err.message);
      toast.error("Failed to unblock user");
    }
  };

  const handleMakeAdmin = async (user) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/make-admin/${user._id}`);
      toast.success(`${user.name} is now an admin`);
    } catch (err) {
      console.error("Make admin error:", err.response?.data || err.message);
      toast.error("Failed to make admin");
    }
  };

  // Alternate background colors
  const rowColors = [
    "bg-blue-50 border-l-4 border-blue-400",
    "bg-green-50 border-l-4 border-green-400",
    "bg-purple-50 border-l-4 border-purple-400",
    "bg-yellow-50 border-l-4 border-yellow-400",
  ];
  const colorClass = rowColors[index % rowColors.length];

  return (
    <>
      <div
        className={`flex items-center text-[16px] rounded-xl shadow-sm mb-3 ${colorClass}`}
      >
        {/* User info */}
        <div className="flex items-center gap-3 w-1/4 px-6 py-4">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-200 text-indigo-800">
              {user.role || "User"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <p className="w-1/6 px-6 py-4 flex items-center gap-2 text-blue-700 font-bold text-lg">
          <FaTasks /> {user.totalTasks || 0}
        </p>
        <p className="w-1/6 px-6 py-4 flex items-center gap-2 text-green-700 font-bold text-lg">
          <FaCheckCircle /> {user.completedTasks || 0}
        </p>
        <p className="w-1/4 px-6 py-4 flex items-center gap-2 text-purple-700 font-medium">
          <FaCalendarAlt />
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
        </p>

        {/* Actions */}
        <div className="flex gap-4 w-1/6 px-6 py-4">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="Edit"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
          <img
            src={del}
            alt="Delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AdminUserModal
          user={user}
          closeModal={() => setShowModal(false)}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          onMakeAdmin={handleMakeAdmin}
        />
      )}
    </>
  );
};

export default AdminUsersRow;
