import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminUsersRow = ({ user, index, setSelectedUser, openDeleteModal, refreshUsers }) => {
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ BLOCK USER
  const handleBlock = async () => {
    try {
      await API.put(`/api/admin/block/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${user.name} blocked`);
      refreshUsers(); // 🔥 refresh UI
    } catch (err) {
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
      toast.error("Failed to make admin");
    }
  };

  return (
    <>
      {/* MOBILE */}
      <div className="lg:hidden bg-white border rounded-3xl p-6 mb-4 shadow-sm">
        {/* ...unchanged UI... */}

        <div className="flex gap-6 mt-6 pt-4 border-t">
          <img onClick={() => setShowModal(true)} src={pen} alt="edit" className="w-6 h-6 cursor-pointer" />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center px-8 py-5 border-b hover:bg-gray-50 bg-white">
        {/* ...unchanged UI... */}

        <div className="flex gap-6">
          <img onClick={() => setShowModal(true)} src={pen} alt="edit" className="w-6 h-6 cursor-pointer" />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
          />
        </div>
      </div>

      {/* ✅ MODAL */}
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