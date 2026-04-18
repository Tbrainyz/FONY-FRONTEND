import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ViewModal from "../components/ViewModal";
import DeleteModal from "../components/DeleteModal";
import arr from "../assets/AltArrow.svg";
import { TasksContext } from "../context/TasksContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CompletedPage = () => {
  const {
    tasks,
    fetchTasks,
    totalPages,
    hasNextPage,
    hasPrevPage,
    loading,
    priorityFilter,
    setPriorityFilter,
  } = useContext(TasksContext);

  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch tasks
  useEffect(() => {
    fetchTasks(currentPage, priorityFilter || "", 100);
  }, [currentPage, priorityFilter]);

  useEffect(() => setCurrentPage(1), [priorityFilter]);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user]);

  const handleDeleteConfirm = async () => {
    try {
      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      fetchTasks(currentPage, priorityFilter || "", 100);
    } catch {
      toast.error("Failed to delete task");
    }
  };

  // Styles
  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const p = priority.toLowerCase();
    if (p === "high")
      return "bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-600 dark:text-red-400";
    if (p === "medium")
      return "bg-orange-100 dark:bg-orange-900/30 border border-orange-500 text-orange-600 dark:text-orange-400";
    if (p === "low")
      return "bg-blue-100 dark:bg-blue-900/30 border border-blue-500 text-blue-600 dark:text-blue-400";
  };

  const getProgressStyle = (progress = 0) => {
    if (progress <= 25) return "bg-gradient-to-r from-red-400 to-red-600";
    if (progress <= 50) return "bg-gradient-to-r from-yellow-400 to-orange-500";
    if (progress <= 75) return "bg-gradient-to-r from-green-400 to-green-600";
    return "bg-gradient-to-r from-emerald-500 to-emerald-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Completed Tasks
          </h2>

          {/* FILTER */}
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpenFilter(!openFilter)}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 
              px-4 py-2 rounded-xl cursor-pointer 
              bg-white dark:bg-gray-900 
              text-gray-900 dark:text-white"
            >
              <span className="capitalize">{priorityFilter || "All"}</span>

              <img
                src={arr}
                className={`w-4 transition-transform duration-200 
                ${openFilter ? "rotate-180" : ""} 
                dark:invert`}
              />
            </div>

            {openFilter && (
              <div className="absolute right-0 mt-2 w-40 
                bg-white dark:bg-gray-900 
                border border-gray-200 dark:border-gray-700 
                rounded-xl shadow-lg z-50 overflow-hidden"
              >
                {["All", "high", "medium", "low"].map((item) => (
                  <p
                    key={item}
                    onClick={() => {
                      setPriorityFilter(item === "All" ? "" : item);
                      setOpenFilter(false);
                    }}
                    className="px-4 py-2 cursor-pointer capitalize
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            <p className="text-center py-20 text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-center py-20 text-gray-500 dark:text-gray-400">
              No completed tasks
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-900 
                border border-gray-200 dark:border-gray-800 
                rounded-2xl p-5 shadow-sm hover:shadow-xl transition"
              >
                <div className="flex justify-between mb-3">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {task.title}
                  </p>

                  <span className={`px-3 py-1 text-xs rounded-xl border ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <p>{new Date(task.createdAt).toLocaleDateString("en-GB")}</p>
                  <p className="font-medium">{task.status}%</p>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
                  <div
                    className={`h-2 ${getProgressStyle(task.status)}`}
                    style={{ width: `${task.status}%` }}
                  />
                </div>

                <div className="flex justify-between gap-3 text-gray-700 dark:text-gray-300">
                  <IoEye
                    onClick={() => setSelectedTask(task)}
                    className="cursor-pointer hover:text-blue-500"
                  />
                  <FaTrash
                    onClick={() => {
                      setTaskToDelete(task);
                      setShowDeleteModal(true);
                    }}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 mt-6 overflow-hidden">

          <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-800 font-semibold text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <div className="col-span-5 py-4 pl-6">Task</div>
            <div className="col-span-2 py-4">Priority</div>
            <div className="col-span-2 py-4">Date</div>
            <div className="col-span-2 py-4">Status</div>
            <div className="col-span-1 py-4 pr-6 text-right">Actions</div>
          </div>

          {tasks.map((task) => (
            <div
              key={task._id}
              className="grid grid-cols-12 px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300"
            >
              <div className="col-span-5">{task.title}</div>

              <div className="col-span-2">
                <span className={`px-3 py-1 rounded-xl text-sm border ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              <div className="col-span-2">
                {new Date(task.createdAt).toLocaleDateString("en-GB")}
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className={`h-2 ${getProgressStyle(task.status)}`}
                    style={{ width: `${task.status}%` }}
                  />
                </div>
                {task.status}%
              </div>

              <div className="col-span-1 flex justify-end gap-3 text-gray-700 dark:text-gray-300">
                <IoEye className="hover:text-blue-500 cursor-pointer" />
                <FaTrash
                  onClick={() => {
                    setTaskToDelete(task);
                    setShowDeleteModal(true);
                  }}
                  className="hover:text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between mt-6 text-gray-700 dark:text-gray-300">
          <p>Page {currentPage} of {totalPages}</p>

          <div className="flex gap-3">
            <MdOutlineKeyboardArrowLeft
              onClick={() => hasPrevPage && setCurrentPage((p) => p - 1)}
              className={`w-8 h-8 cursor-pointer transition 
              ${hasPrevPage 
                ? "hover:text-black dark:hover:text-blue-400" 
                : "opacity-30 cursor-not-allowed"}`}
            />

            <MdOutlineKeyboardArrowRight
              onClick={() => hasNextPage && setCurrentPage((p) => p + 1)}
              className={`w-8 h-8 cursor-pointer transition 
              ${hasNextPage 
                ? "hover:text-black dark:hover:text-blue-400" 
                : "opacity-30 cursor-not-allowed"}`}
            />
          </div>
        </div>

        {/* MODALS */}
        {selectedTask && (
          <ViewModal task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}

        {showDeleteModal && taskToDelete && (
          <DeleteModal
            task={taskToDelete}
            closeModal={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedPage;
