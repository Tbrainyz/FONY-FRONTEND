import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import API from "../api/axios";
import AdminSummaryCard from "../components/AdminSummarycard";
import AdminUsersRow from "../components/AdminUsersRow";

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
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl">
          Admin Dashboard
        </h3>

        {/* Summary Cards */}
        <AdminSummaryCard stats={stats} />

        {/* Users Table */}
        <div className="border rounded-3xl shadow overflow-hidden bg-white">
          {/* Table Header - Scrollable on mobile */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px] flex bg-[#FBFBFB] font-semibold text-lg border-b">
              <p className="w-[28%] px-6 py-5">User</p>
              <p className="w-[18%] px-6 py-5">Total Task</p>
              <p className="w-[18%] px-6 py-5">Completed Task</p>
              <p className="w-[20%] px-6 py-5">Date Joined</p>
              <p className="w-[16%] px-6 py-5">Actions</p>
            </div>

            {/* Table Body */}
            {loading ? (
              <div className="py-20 text-center text-gray-500">Loading users...</div>
            ) : (
              users.map((user) => (
                <AdminUsersRow key={user._id} user={user} />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 border-t bg-white">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={`text-3xl cursor-pointer transition ${page === 1 ? "opacity-40" : "hover:text-blue-600"}`}
                />

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <p
                      key={num}
                      onClick={() => setPage(num)}
                      className={`cursor-pointer px-4 py-2 rounded-xl text-sm transition ${
                        num === page
                          ? "bg-black text-white font-bold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </p>
                  ))}
                </div>

                <MdOutlineKeyboardArrowRight
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={`text-3xl cursor-pointer transition ${page === totalPages ? "opacity-40" : "hover:text-blue-600"}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;