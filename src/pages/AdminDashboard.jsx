import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
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

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDeleteUser = async () => {
    try {
      await API.delete(`/api/admin/delete/${selectedUser._id}`);

      // ✅ instant UI update
      setUsers((prev) =>
        prev.filter((u) => u._id !== selectedUser._id)
      );

      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <AdminSummaryCard stats={stats} />

      <div className="bg-white rounded-3xl shadow">
        {users.map((user, index) => (
          <AdminUsersRow
            key={user._id}
            user={user}
            index={index}
            setSelectedUser={setSelectedUser}
            openDeleteModal={() => setShowDeleteModal(true)}
          />
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
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