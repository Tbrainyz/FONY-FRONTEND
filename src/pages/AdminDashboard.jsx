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
// ================= BLOCK =================
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
    console.error(err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to block user");
  }
};

// ================= UNBLOCK =================
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
    console.error(err.response?.data || err.message);
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
      console.error(err);
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
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl">
          Admin Dashboard
        </h3>

        <AdminSummaryCard stats={stats} />

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
                  onBlock={handleBlockUser}
                  onUnblock={handleUnblockUser}
                  onMakeAdmin={handleMakeAdmin}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-between items-center px-6 py-5 border-t">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={`text-3xl cursor-pointer ${page === 1 ? "opacity-40" : ""}`}
                />

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <p
                    key={num}
                    onClick={() => setPage(num)}
                    className={`cursor-pointer px-4 py-2 rounded-xl ${
                      num === page ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </p>
                ))}

                <MdOutlineKeyboardArrowRight
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={`text-3xl cursor-pointer ${page === totalPages ? "opacity-40" : ""}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
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