import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import API from "../api/axios";
import AdminSummaryCard from "../components/AdminSummarycard";
import AdminUsersRow from "../components/AdminUsersRow";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ DELETE STATE
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/api/admin/users?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {
      const res = await API.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [page]);

  // ================= REFRESH USERS =================
  const refreshUsers = () => {
    fetchUsers();
  };

  // ================= DELETE USER =================
  const handleDeleteUser = async () => {
    try {
      await API.delete(`/api/admin/delete/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ instant UI update
      setUsers((prev) =>
        prev.filter((u) => u._id !== selectedUser._id)
      );

      toast.success("User deleted successfully");
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl">
          Admin Dashboard
        </h3>

        <AdminSummaryCard stats={stats} />

        {/* ================= USERS TABLE ================= */}
        <div className="bg-white border rounded-3xl shadow overflow-hidden">

          {/* Header */}
          <div className="hidden lg:flex bg-[#FBFBFB] font-semibold text-lg border-b">
            <p className="flex-1 px-6 py-5">User</p>
            <p className="w-40 px-6 py-5">Total Tasks</p>
            <p className="w-40 px-6 py-5">Completed</p>
            <p className="w-52 px-6 py-5">Date Joined</p>
            <p className="w-32 px-6 py-5">Actions</p>
          </div>

          {/* Rows */}
          <div>
            {loading ? (
              <div className="py-16 text-center text-gray-500">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                No users found
              </div>
            ) : (
              users.map((user, index) => (
                <AdminUsersRow
                  key={user._id}
                  user={user}
                  index={index}
                  setSelectedUser={setSelectedUser}
                  openDeleteModal={() => setShowDeleteModal(true)}
                  refreshUsers={refreshUsers}   // ✅ FIXED
                />
              ))
            )}
          </div>

          {/* ================= PAGINATION ================= */}
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 border-t">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={`text-3xl cursor-pointer ${
                    page === 1 ? "opacity-40" : ""
                  }`}
                />

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <p
                    key={num}
                    onClick={() => setPage(num)}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm ${
                      num === page
                        ? "bg-black text-white font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </p>
                ))}

                <MdOutlineKeyboardArrowRight
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={`text-3xl cursor-pointer ${
                    page === totalPages ? "opacity-40" : ""
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-4">
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