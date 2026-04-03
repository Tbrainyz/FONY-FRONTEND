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
      {/* Mobile Card View */}
      <div className="lg:hidden bg-white border rounded-3xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-12 h-12 rounded-full border"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg">{user.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <FaTasks className="text-blue-600 mb-1" />
            <span className="font-bold">{user.totalTasks || 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-600 mb-1" />
            <span className="font-bold">{user.completedTasks || 0}</span>
          </div>
          <div className="flex flex-col items-center text-gray-600">
            <FaCalendarAlt className="mb-1" />
            <span className="text-xs">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "—"}
            </span>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
          <img src={del} alt="delete" className="w-6 h-6 cursor-pointer hover:scale-110" />
        </div>
      </div>

      {/* Desktop Table Row */}
      <div className="hidden lg:flex items-center gap-6 px-6 py-5 border-b hover:bg-gray-50 bg-white">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8 flex-1">
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

        <div className="flex gap-6">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
          <img src={del} alt="delete" className="w-6 h-6 cursor-pointer hover:scale-110" />
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