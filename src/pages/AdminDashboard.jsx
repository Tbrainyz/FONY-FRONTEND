import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { toast } from "react-toastify";
import API from "../api/axios";
import AdminSummaryCard from "../components/AdminSummarycard";
import AdminUsersRow from "../components/AdminUsersRow";
import DeleteModal from "../components/DeleteModal";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/admin/users?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchUsers();
  }, [page]);

  // ================= ACTIONS =================
  const handleBlockUser = async (user) => {
    try {
      await API.put(`/api/admin/block/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlocked: true } : u
        )
      );

      toast.success("User blocked successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (user) => {
    try {
      await API.put(`/api/admin/unblock/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlocked: false } : u
        )
      );

      toast.success("User unblocked successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleMakeAdmin = async (user) => {
    try {
      await API.put(`/api/admin/make-admin/${user._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, role: "admin" } : u
        )
      );

      toast.success("User promoted to admin");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await API.delete(`/api/admin/delete/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) =>
        prev.filter((u) => u._id !== selectedUser._id)
      );

      setShowDeleteModal(false);
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 md:px-8 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl text-gray-900 dark:text-white">
          Admin Dashboard
        </h3>

        <AdminSummaryCard stats={stats} />

        {/* Main Table Container */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow overflow-hidden">

          {/* Table Header */}
          <div className="hidden lg:flex w-full bg-[#FBFBFB] dark:bg-gray-800 font-semibold text-lg border-b border-gray-200 dark:border-gray-700">
            <p className="w-[30%] px-6 py-5 text-gray-700 dark:text-gray-300">User</p>
            <p className="w-[20%] text-center py-5 text-gray-700 dark:text-gray-300">Total Tasks</p>
            <p className="w-[20%] text-center py-5 text-gray-700 dark:text-gray-300">Completed</p>
            <p className="w-[30%] text-center py-5 text-gray-700 dark:text-gray-300">Date Joined</p>
            <p className="w-[20%] py-5 px-7 text-gray-700 dark:text-gray-300">Actions</p>
          </div>

          {/* Users Rows */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                No users found
              </div>
            ) : (
              users.map((user) => (
                <AdminUsersRow
                  key={user._id}
                  user={user}
                  setSelectedUser={setSelectedUser}
                  openDeleteModal={() => setShowDeleteModal(true)}
                  onBlock={handleBlockUser}
                  onUnblock={handleUnblockUser}
                  onMakeAdmin={handleMakeAdmin}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && users.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={`text-3xl cursor-pointer text-gray-700 dark:text-gray-300 
                    ${page === 1 ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
                />

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <p
                    key={num}
                    onClick={() => setPage(num)}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm transition-colors
                      ${num === page 
                        ? "bg-black text-white dark:bg-white dark:text-black font-bold" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                  >
                    {num}
                  </p>
                ))}

                <MdOutlineKeyboardArrowRight
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={`text-3xl cursor-pointer text-gray-700 dark:text-gray-300 
                    ${page === totalPages ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
          <DeleteModal
            user={selectedUser}
            closeModal={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteUser}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;