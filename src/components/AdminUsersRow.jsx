import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUsersRow = ({ user, onUserDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await axios.delete("http://localhost:5000/api/users/delete-user", {
        data: { email: user.email },
      });
      toast.success(`${user.name} deleted successfully`);
      setShowDeleteModal(false);
      onUserDeleted(user.email); // ✅ notify parent
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      {/* MOBILE CARD */}
      <div className="lg:hidden bg-white border rounded-3xl p-6 mb-4 shadow-sm">
        {/* ...user info... */}
        <div className="flex gap-6 mt-6 pt-4 border-t">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
          <img
            onClick={() => setShowDeleteModal(true)}
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110"
          />
        </div>
      </div>

      {/* DESKTOP ROW */}
      <div className="hidden lg:flex items-center px-8 py-5 border-b hover:bg-gray-50 bg-white">
        {/* ...user info... */}
        <div className="flex gap-6">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
          <img
            onClick={() => setShowDeleteModal(true)}
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>

      {showModal && (
        <AdminUserModal
          user={user}
          closeModal={() => setShowModal(false)}
          // block/unblock handlers...
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          title="Delete User"
          message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
          onConfirm={handleDeleteUser}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default AdminUsersRow;
