import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminUsersRow = ({
  user,
  index,
  setSelectedUser,
  openDeleteModal,
  refreshUsers,
}) => {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ BLOCK USER
  const handleBlock = async () => {
    console.log("BLOCK CLICKED:", user._id);

    try {
      await API.put(`/api/admin/block/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${user.name} blocked`);
      refreshUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to block user");
    }
  };

  // ✅ UNBLOCK USER
  const handleUnblock = async () => {
    try {
      await API.put(`/api/admin/unblock/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${user.name} unblocked`);
      refreshUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to unblock user");
    }
  };

  // ✅ MAKE ADMIN
  const handleMakeAdmin = async () => {
    try {
      await API.put(`/api/admin/make-admin/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${user.name} is now admin`);
      refreshUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to make admin");
    }
  };

  return (
    <>
      {/* MOBILE */}
      <div className="lg:hidden bg-white border rounded-3xl p-6 mb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg">{user.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center text-sm">
          <div>
            <FaTasks className="text-blue-600 mx-auto mb-1" />
            <p className="font-bold">{user.totalTasks || 0}</p>
          </div>
          <div>
            <FaCheckCircle className="text-green-600 mx-auto mb-1" />
            <p className="font-bold">{user.completedTasks || 0}</p>
          </div>
          <div className="text-gray-600">
            <FaCalendarAlt className="mx-auto mb-1" />
            <p className="text-xs">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-GB")
                : "—"}
            </p>
          </div>
        </div>

        <div className="flex gap-6 mt-6 pt-4 border-t">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110"
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center px-8 py-5 border-b hover:bg-gray-50 bg-white">
        <div className="flex items-center gap-4 flex-1">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-10 h-10 rounded-full border object-cover"
          />
          <div>
            <p className="font-semibold text-[17px]">{user.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-12 flex-1">
          <span className="font-bold">{user.totalTasks || 0}</span>
          <span className="font-bold">{user.completedTasks || 0}</span>
          <span>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-GB")
              : "—"}
          </span>
        </div>

        <div className="flex gap-6">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110"
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
          />
        </div>
      </div>

      {/* MODAL */}
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