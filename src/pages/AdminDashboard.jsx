import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import API from "../api/axios";
import AdminSummaryCard from "../Components/AdminSummaryCard";
import AdminUsersRow from "../Components/AdminUsersRow";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

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

    fetchStats();
    fetchUsers();
  }, [page]);

  return (
    <div className="px-[100px] flex flex-col gap-[50px]">
      <h3 className="font-[Caveat] font-bold text-[30px]">Admin Dashboard</h3>

      {/* Summary Cards */}
      <AdminSummaryCard stats={stats} />

      {/* Users Table */}
      <div className="border rounded-[30px] shadow overflow-hidden bg-white">
        <div className="flex bg-[#FBFBFB] font-semibold text-[20px]">
          <p className="w-1/4 px-6 py-4">User</p>
          <p className="w-1/6 px-6 py-4">Total Task</p>
          <p className="w-1/6 px-6 py-4">Completed Task</p>
          <p className="w-1/4 px-6 py-4">Date Joined</p>
          <p className="w-1/6 px-6 py-4">Actions</p>
        </div>

        {loading && <div className="py-10 text-center">Loading users...</div>}

        {!loading && Array.isArray(users) && users.map((user) => (
          <AdminUsersRow key={user._id} user={user} />
        ))}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-between px-8 py-4 border-t">
            <p>Page {page} of {totalPages}</p>
            <div className="flex items-center gap-3">
              <MdOutlineKeyboardArrowLeft
                onClick={() => page > 1 && setPage(page - 1)}
                className={`text-2xl cursor-pointer ${page === 1 ? "opacity-40" : ""}`}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <p
                  key={num}
                  onClick={() => setPage(num)}
                  className={`cursor-pointer px-3 py-1 rounded ${num === page ? "font-bold underline" : ""}`}
                >
                  {num}
                </p>
              ))}
              <MdOutlineKeyboardArrowRight
                onClick={() => page < totalPages && setPage(page + 1)}
                className={`text-2xl cursor-pointer ${page === totalPages ? "opacity-40" : ""}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
