import React, { useContext } from "react";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ 
  tasks = [], 
  setSelectedTask, 
  openUpdateModal, 
  openDeleteModal,
  openViewModal ,
    openCreateModal
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  // New progress color logic matching your example
  const getProgressStyle = (progress = 0) => {
    let backgroundColor;

    if (progress <= 25) {
      backgroundColor = "#fe2903";        // Red
    } else if (progress <= 50) {
      backgroundColor = "#FFA500";        // Orange
    } else if (progress <= 75) {
      backgroundColor = "#90EE90";        // Light Green
    } else {
      backgroundColor = "#339933";        // Dark Green
    }

    return {
      width: `${progress}%`,
      backgroundColor,
      transition: "width 0.4s ease-in-out", // smooth animation
    };
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400";
    if (prio === "medium") return "bg-orange-100 dark:bg-orange-900/30 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400";
    if (prio === "low") return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400";
    return "";
  };

  return (
    <div>
      {/* ==================== MOBILE VIEW ==================== */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="font-semibold text-lg leading-tight pr-4 text-gray-900 dark:text-white">
                  {task.title}
                </p>
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-2xl border ${getPriorityClass(task.priority)}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}</p>
                <p className="font-medium">{task.status || 0}%</p>
              </div>

              {/* Updated Progress Bar - Mobile */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
                <div
                  className="h-3 rounded-full"
                  style={getProgressStyle(task.status)}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-6">
                <IoEye
                  onClick={() => openViewModal(task)}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                />
                <FaEdit
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                />
                <FaTrash
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-[360px] px-4 py-6">
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold">No Task Created yet</p>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#77C2FF] px-4 py-2 text-xs font-medium text-black shadow-md shadow-black border border-black" onClick={openCreateModal}
                >
                  Create new task
                </button>
              </div>
            </div>
        )}
      </div>

      {/* ==================== DESKTOP TABLE VIEW ==================== */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center px-8 py-5 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                index % 2 === 1 ? "bg-[#F8FBFF] dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"
              }`}
            >
              <div className="w-[30%] pr-6">
                <p className="font-semibold text-[17px] text-gray-900 dark:text-white">{task.title}</p>
              </div>

              <div className="w-[15%] text-center">
                <span
                  className={`inline-block px-6 py-1.5 rounded-2xl text-sm font-medium border ${getPriorityClass(task.priority)}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="w-[20%] text-center text-gray-700 dark:text-gray-300">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
              </div>

              {/* Updated Progress Bar - Desktop */}
              <div className="w-[20%]">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-2.5 rounded-full"
                      style={getProgressStyle(task.status)}
                    />
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap min-w-[45px] text-right text-gray-700 dark:text-gray-300">
                    {task.status || 0}%
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-[15%] flex justify-end gap-6">
                <IoEye
                  onClick={() => openViewModal(task)}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                />
                <FaEdit
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                />
                <FaTrash
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                  className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                />
              </div>
            </div>
          ))
        ) : (
              <div className="min-h-[360px] px-4 py-6">
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold">No Task Created yet</p>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#77C2FF] px-4 py-2 text-xs font-medium text-black shadow-md shadow-black border border-black" onClick={openCreateModal}
                >
                  Create new task
                </button>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default TaskRow;