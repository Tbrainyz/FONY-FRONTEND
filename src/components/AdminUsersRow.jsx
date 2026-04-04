import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";

const AdminUsersRow = ({
  user,
  setSelectedUser,
  openDeleteModal,
  onBlock,
  onUnblock,
  onMakeAdmin,
}) => {
  const [showModal, setShowModal] = useState(false);

  const isBlocked = user.isBlocked;
  const isAdmin = user.role === "admin";

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-3xl p-6 mb-4 shadow-sm hover:shadow-md transition">

        {/* Profile */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-indigo-400 object-cover"
          />

          <div className="flex-1">
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {user.name}
            </p>

            {/* Role Badge */}
            <div className="flex gap-2 mt-1">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {user.role}
              </span>

              {isBlocked && (
                <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                  Blocked
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3">
            <FaTasks className="text-blue-600 mx-auto mb-1" />
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {user.totalTasks || 0}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3">
            <FaCheckCircle className="text-green-600 mx-auto mb-1" />
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {user.completedTasks || 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
            <FaCalendarAlt className="mx-auto mb-1 text-gray-600 dark:text-gray-300" />
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-GB")
                : "—"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-6 mt-6 pt-4 border-t dark:border-gray-700">
          <img
            onClick={() => setShowModal(true)}
            src={pen}
            alt="edit"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
          <img
            src={del}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
          />
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex items-center px-8 py-5 border-b dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">

        {/* User Info */}
        <div className="flex items-center gap-4 w-[30%]">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-11 h-11 rounded-full border-2 border-indigo-400 object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {user.name}
            </p>

            <div className="flex gap-2 mt-1">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {user.role}
              </span>

              {isBlocked && (
                <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                  Blocked
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 w-[50%] text-center">

          <span className="w-[30%] font-semibold text-blue-600">
            {user.totalTasks}
          </span>

          <span className="w-[30%] font-semibold text-green-600">
            {user.completedTasks}
          </span>

          <span className="w-[40%] text-gray-600 dark:text-gray-300">
            {new Date(user.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center w-[20%] gap-6">
          <img
            src={pen}
            onClick={() => setShowModal(true)}
            className="w-6 cursor-pointer hover:scale-110 transition"
          />
          <img
            src={del}
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
            className="w-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <AdminUserModal
          user={user}
          closeModal={() => setShowModal(false)}
          onBlock={() => onBlock(user)}
          onUnblock={() => onUnblock(user)}
          onMakeAdmin={() => onMakeAdmin(user)}
        />
      )}
    </>
  );
};

export default AdminUsersRow;