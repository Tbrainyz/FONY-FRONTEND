import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import pic from "../assets/profile.svg";
import AdminUserModal from "./AdminUserModal";

const AdminUsersRow = ({
  user,
  index,
  setSelectedUser,
  openDeleteModal,
  onBlock,
  onUnblock,
  onMakeAdmin,
}) => {
  const [showModal, setShowModal] = useState(false);

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
          <div>
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
            className="w-6 h-6 cursor-pointer"
          />
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
      <div className="hidden lg:flex w-full items-center px-8 py-5 border-b bg-white">
        <div className="flex w-[30%] items-center gap-4 ">
          <img
            src={user.profilePicture || pic}
            alt=""
            className="w-10 h-10 rounded-full border object-cover"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <span className="text-xs bg-indigo-100 px-2 py-1 rounded">
              {user.role}
            </span>
          </div>
        </div>

        <div className="flex gap-12 w-[70%] text-center">
          <span className="w-[30%] text-center">{user.totalTasks} </span>
          <span className="w-[30%] text-center">{user.completedTasks} </span>
          <span className="w-[40%] text-center">
            {new Date(user.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>

        <div className="flex items-center justify-center w-[20%] gap-6">
          <img src={pen} onClick={() => setShowModal(true)} className="w-6 cursor-pointer" />
          <img
            src={del}
            onClick={() => {
              setSelectedUser(user);
              openDeleteModal();
            }}
            className="w-6 cursor-pointer"
          />
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <AdminUserModal
          user={user}
          closeModal={() => setShowModal(false)}
          onBlock={onBlock}
          onUnblock={onUnblock}
          onMakeAdmin={onMakeAdmin}
        />
      )}
    </>
  );
};

export default AdminUsersRow;