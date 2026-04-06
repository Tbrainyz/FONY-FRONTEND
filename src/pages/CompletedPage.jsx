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
    page,
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchTasks(currentPage, priorityFilter || "", 100);
  }, [currentPage, priorityFilter, fetchTasks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priorityFilter]);

    useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
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
    if (!taskToDelete?._id) return;

    try {
      // TODO: Replace with actual delete function from context
      // await deleteTask(taskToDelete._id);

      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      setTaskToDelete(null);
      fetchTasks(currentPage, priorityFilter || "", 100);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-100 dark:bg-red-900/30 border border-red-500 dark:border-red-400 text-red-600 dark:text-red-400";
    if (prio === "medium") return "bg-orange-100 dark:bg-orange-900/30 border border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400";
    if (prio === "low") return "bg-blue-100 dark:bg-blue-900/30 border border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400";
    return "";
  };

  const getProgressColor = (status = 100) => {
    if (status === 100) return "bg-green-500";
    if (status >= 75) return "bg-[#77C2FF] dark:bg-blue-400";
    if (status >= 50) return "bg-blue-500 dark:bg-blue-400";
    if (status >= 25) return "bg-yellow-500 dark:bg-yellow-400";
    return "bg-red-500 dark:bg-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-[Caveat] font-extrabold text-gray-900 dark:text-white">
            Completed Tasks
          </h2>

          {/* Priority Filter */}
          <div ref={dropdownRef} className="relative flex items-center gap-3">
            <p className="font-medium text-gray-700 dark:text-gray-300">Priority</p>
            <div
              className="border border-gray-300 dark:border-gray-700 flex items-center justify-between 
                         w-full sm:w-[160px] h-11 px-4 rounded-2xl cursor-pointer 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <p className="capitalize">{priorityFilter || "All"}</p>
              <img
                src={arr}
                alt="arrow"
                className={`w-4 transition-transform ${openFilter ? "rotate-180" : ""}`}
              />
            </div>

            {openFilter && (
              <div className="absolute top-12 right-0 w-[160px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                             rounded-xl shadow-lg z-50 py-1">
                {["All", "high", "medium", "low"].map((item) => (
                  <p
                    key={item}
                    onClick={() => handleFilterSelect(item)}
                    className={`px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-center capitalize 
                      text-gray-700 dark:text-gray-300
                      ${(priorityFilter || "All") === item 
                        ? "bg-gray-100 dark:bg-gray-800 font-medium" 
                        : ""}`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow overflow-hidden">

          {/* Desktop Table Header - FIXED ALIGNMENT */}
          <div className="hidden lg:grid grid-cols-12 bg-[#FBFBFB] dark:bg-gray-800 font-bold border-b border-gray-200 dark:border-gray-700 text-base">
            <div className="col-span-5 py-5 pl-8 text-gray-700 dark:text-gray-300">Task Name</div>
            <div className="col-span-2 py-5 pl-4 text-gray-700 dark:text-gray-300">Priority</div>
            <div className="col-span-2 py-5 text-gray-700 dark:text-gray-300">Date</div>
            <div className="col-span-2 py-5 text-gray-700 dark:text-gray-300">Status</div>
            <div className="col-span-1 py-5 pr-8 text-gray-700 dark:text-gray-300 text-right">Actions</div>
          </div>

          {/* Content Area */}
          <div className="min-h-[600px]">
            {loading ? (
              <div className="flex items-center justify-center h-full py-20">
                <p className="text-gray-500 dark:text-gray-400">Loading completed tasks...</p>
              </div>
            ) : tasks.length > 0 ? (
              <>
                {/* ================= MOBILE CARDS ================= */}
                <div className="lg:hidden space-y-4 p-4">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <p className="font-semibold text-lg flex-1 pr-4 text-gray-900 dark:text-white">
                          {task.title}
                        </p>
                        <span
                          className={`inline-block px-4 py-1 text-sm font-medium rounded-2xl border ${getPriorityClass(task.priority)}`}
                        >
                          {task.priority || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                        <p>{new Date(task.createdAt).toLocaleDateString("en-GB")}</p>
                        <p className="font-medium">{task.status || 100}%</p>
                      </div>

                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
                        <div
                          className={`h-3 rounded-full transition-all ${getProgressColor(task.status)}`}
                          style={{ width: `${task.status || 100}%` }}
                        />
                      </div>

                      <div className="flex gap-5">
                        <IoEye
                          onClick={() => setSelectedTask(task)}
                          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        />
                        <FaTrash
                          onClick={() => handleDeleteClick(task)}
                          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= DESKTOP TABLE - FIXED ALIGNMENT ================= */}
                <div className="hidden lg:block">
                  {tasks.map((task, index) => (
                    <div
                      key={task._id}
                      className={`grid grid-cols-12 items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-5 px-6 transition-colors ${
                        index % 2 === 1 ? "bg-[#F8FBFF] dark:bg-gray-800/50" : ""
                      }`}
                    >
                      {/* Task Name */}
                      <div className="col-span-5 font-semibold text-[17px] text-gray-900 dark:text-white pl-2">
                        {task.title}
                      </div>

                      {/* Priority */}
                      <div className="col-span-2 pl-4">
                        <span
                          className={`inline-block px-5 py-1.5 rounded-2xl text-sm font-medium border ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority || "—"}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="col-span-2 text-gray-700 dark:text-gray-300">
                        {new Date(task.createdAt).toLocaleDateString("en-GB")}
                      </div>

                      {/* Status / Progress */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                              style={{ width: `${task.status || 100}%` }}
                            />
                          </div>
                          <span className="font-medium text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                            {task.status || 100}%
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex gap-5 justify-end pr-2">
                        <IoEye
                          onClick={() => setSelectedTask(task)}
                          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        />
                        <FaTrash
                          onClick={() => handleDeleteClick(task)}
                          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No completed tasks found
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8 py-5 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex items-center gap-4">
              <MdOutlineKeyboardArrowLeft
                onClick={() => hasPrevPage && setCurrentPage((p) => p - 1)}
                className={`w-8 h-8 cursor-pointer text-gray-700 dark:text-gray-300 
                  ${!hasPrevPage ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
              />
              {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => i + 1).map((num) => (
                <p
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                    num === currentPage 
                      ? "bg-black text-white dark:bg-white dark:text-black" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {num}
                </p>
              ))}
              <MdOutlineKeyboardArrowRight
                onClick={() => hasNextPage && setCurrentPage((p) => p + 1)}
                className={`w-8 h-8 cursor-pointer text-gray-700 dark:text-gray-300 
                  ${!hasNextPage ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
              />
            </div>
          </div>
        </div>

        {/* View Modal - Fixed props passing */}
        {selectedTask && (
          <ViewModal
            task={selectedTask}   // Pass the full task object
            onClose={() => setSelectedTask(null)}
          />
        )}

        {/* Delete Modal */}
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