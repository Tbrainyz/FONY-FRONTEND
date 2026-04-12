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
import { TaskContext } from "../context/TasksContext";
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
  } = useContext(TaskContext);

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
  }, [currentPage, priorityFilter, fetchTasks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priorityFilter]);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user]);

  const handleFilterSelect = (value) => {
    const newFilter = value === "All" ? "" : value;
    setPriorityFilter(newFilter);
    setOpenFilter(false);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      setTaskToDelete(null);
      fetchTasks(currentPage, priorityFilter || "", 100);
    } catch {
      toast.error("Failed to delete task");
    }
  };

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

  const getProgressColor = (status = 100) => {
    if (status === 100) return "bg-green-500";
    if (status >= 75) return "bg-blue-400";
    if (status >= 50) return "bg-blue-500";
    if (status >= 25) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
            Completed Tasks
          </h2>

          {/* FILTER */}
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpenFilter(!openFilter)}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-xl cursor-pointer bg-white dark:bg-gray-900"
            >
              <span className="capitalize text-gray-900 dark:text-white font-medium">
                {priorityFilter || "All"}
              </span>
              <img
                src={arr}
                alt="arrow"
                className={`w-4 transition-transform ${openFilter ? "rotate-180" : ""}`}
              />
            </div>

            {openFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-black/30 z-50 overflow-hidden">
                {["All", "high", "medium", "low"].map((item) => {
                  const isActive = (priorityFilter || "All") === item;

                  return (
                    <p
                      key={item}
                      onClick={() => handleFilterSelect(item)}
                      className={`
                        px-4 py-2 text-center capitalize cursor-pointer transition-colors
                        ${
                          isActive
                            ? "bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">

          {/* HEADER ROW */}
          <div className="hidden lg:grid grid-cols-12 bg-gray-100 dark:bg-gray-800 font-semibold text-sm border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-5 py-4 pl-6 text-gray-700 dark:text-gray-300">Task</div>
            <div className="col-span-2 py-4 text-gray-700 dark:text-gray-300">Priority</div>
            <div className="col-span-2 py-4 text-gray-700 dark:text-gray-300">Date</div>
            <div className="col-span-2 py-4 text-gray-700 dark:text-gray-300">Status</div>
            <div className="col-span-1 py-4 pr-6 text-right text-gray-700 dark:text-gray-300">Actions</div>
          </div>

          {/* CONTENT */}
          <div className="min-h-[500px]">
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
                  className="grid grid-cols-12 items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-5 font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </div>

                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-xl text-sm ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="col-span-2 text-gray-700 dark:text-gray-300">
                    {new Date(task.createdAt).toLocaleDateString("en-GB")}
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(task.status)}`}
                          style={{ width: `${task.status}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {task.status}%
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-end gap-4">
                    <IoEye
                      onClick={() => setSelectedTask(task)}
                      className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    />
                    <FaTrash
                      onClick={() => handleDeleteClick(task)}
                      className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-red-500"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages || 1}
            </p>

            <div className="flex items-center gap-3">
              <MdOutlineKeyboardArrowLeft
                onClick={() => hasPrevPage && setCurrentPage((p) => p - 1)}
                className={`w-9 h-9 cursor-pointer transition-all ${
                  hasPrevPage
                    ? "text-gray-800 dark:text-white hover:scale-110 hover:text-black dark:hover:text-blue-400"
                    : "opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-600"
                }`}
              />

              <MdOutlineKeyboardArrowRight
                onClick={() => hasNextPage && setCurrentPage((p) => p + 1)}
                className={`w-9 h-9 cursor-pointer transition-all ${
                  hasNextPage
                    ? "text-gray-800 dark:text-white hover:scale-110 hover:text-black dark:hover:text-blue-400"
                    : "opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-600"
                }`}
              />
            </div>
          </div>
        </div>

        {/* MODALS */}
        {selectedTask && (
          <ViewModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}

        {showDeleteModal && taskToDelete && (
          <DeleteModal
            task={taskToDelete}
            closeModal={() => {
              setShowDeleteModal(false);
              setTaskToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedPage;
