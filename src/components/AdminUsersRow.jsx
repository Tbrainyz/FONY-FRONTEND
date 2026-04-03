import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUsersRow = ({ user, index }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBlock = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/block/${user._id}`);
      toast.success(`${user.name} blocked`);
    } catch (err) {
      toast.error("Failed to block user");
    }
  };

  const handleUnblock = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/unblock/${user._id}`);
      toast.success(`${user.name} unblocked`);
    } catch (err) {
      toast.error("Failed to unblock user");
    }
  };

  const handleMakeAdmin = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/make-admin/${user._id}`);
      toast.success(`${user.name} is now admin`);
    } catch (err) {
      toast.error("Failed to make admin");
    }
  };

  const rowColors = ["bg-blue-50 border-l-blue-400", "bg-green-50 border-l-green-400", "bg-purple-50 border-l-purple-400", "bg-yellow-50 border-l-yellow-400"];
  const colorClass = rowColors[index % rowColors.length];

  return (
    <>
      <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 px-4 md:px-6 py-5 rounded-2xl shadow-sm mb-3 ${colorClass}`}>
        
        {/* User Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4">
          <img src={user.profilePicture || pic} alt="" className="w-10 h-10 rounded-full border" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        {/* Stats - Stacked on mobile */}
        <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-0 w-full md:w-3/4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 w-1/2 md:w-1/6">
            <FaTasks className="text-blue-600" />
            <span className="font-bold">{user.totalTasks || 0}</span>
          </div>
          <div className="flex items-center gap-2 w-1/2 md:w-1/6">
            <FaCheckCircle className="text-green-600" />
            <span className="font-bold">{user.completedTasks || 0}</span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-1/4 text-sm text-gray-600">
            <FaCalendarAlt />
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
          </div>

          {/* Actions */}
          <div className="flex gap-4 md:ml-auto">
            <img onClick={() => setShowModal(true)} src={pen} alt="edit" className="w-6 h-6 cursor-pointer hover:scale-110" />
            <img src={del} alt="delete" className="w-6 h-6 cursor-pointer hover:scale-110" />
          </div>
        </div>
      </div>

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