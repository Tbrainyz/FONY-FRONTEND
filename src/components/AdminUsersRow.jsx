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

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 px-4 md:px-6 py-5 border-b hover:bg-gray-50 bg-white">
        {/* User Info */}
        <div className="flex items-center gap-3 w-full lg:w-[30%]">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-10 h-10 rounded-full border object-cover"
          />
          <div>
            <p className="font-semibold text-[17px]">{user.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
              {user.role || "User"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap lg:flex-nowrap gap-x-8 gap-y-4 w-full lg:w-[55%] mt-4 lg:mt-0 text-sm">
          <div className="flex items-center gap-2">
            <FaTasks className="text-blue-600" />
            <span className="font-bold">{user.totalTasks || 0}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            <span className="font-bold">{user.completedTasks || 0}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt />
            <span>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "—"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-6 lg:ml-auto pt-4 lg:pt-0">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
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