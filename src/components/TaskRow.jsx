import React, { useContext } from "react";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ 
  tasks = [], 
  setSelectedTask, 
  openUpdateModal, 
  openDeleteModal,
  openViewModal,
  openCreateModal
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getProgressStyle = (progress = 0) => {
    let backgroundColor;

    if (progress <= 25) backgroundColor = "#ef4444";
    else if (progress <= 50) backgroundColor = "#f59e0b";
    else if (progress <= 75) backgroundColor = "#22c55e";
    else backgroundColor = "#15803d";

    return {
      width: `${progress}%`,
      backgroundColor,
      transition: "width 0.4s ease-in-out",
    };
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high")
      return "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400";
    if (prio === "medium")
      return "bg-orange-100 dark:bg-orange-900/30 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400";
    if (prio === "low")
      return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400";
    return "";
  };

  const EmptyState = () => (
    <div className="min-h-[360px] flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        No tasks created yet
      </p>

      <button
        onClick={openCreateModal}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
      >
        + Create new task
      </button>
    </div>
  );

  return (
    <div>
      {/* MOBILE */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="font-medium text-base text-gray-900 dark:text-gray-100">
                  {task.title}
                </p>

                <span className={`px-3 py-1 text-xs rounded-lg border ${getPriorityClass(task.priority)}`}>
                  {task.priority || "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-3 text-gray-500 dark:text-gray-400">
                <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}</p>
                <p>{task.status || 0}%</p>
              </div>

              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                <div className="h-2 rounded-full" style={getProgressStyle(task.status)} />
              </div>

              <div className="flex gap-4">
                <IoEye
                  onClick={() => openViewModal(task)}
                  className="cursor-pointer text-gray-500 hover:text-blue-500"
                />
                <FaEdit
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                  className="cursor-pointer text-gray-500 hover:text-amber-500"
                />
                <FaTrash
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                />
              </div>
            </div>
          ))
        ) : <EmptyState />}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
                index % 2 ? "bg-gray-50 dark:bg-gray-800/40" : ""
              }`}
            >
              <div className="w-[30%]">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {task.title}
                </p>
              </div>

              <div className="w-[15%] text-center">
                <span className={`px-3 py-1 text-xs rounded-lg border ${getPriorityClass(task.priority)}`}>
                  {task.priority || "—"}
                </span>
              </div>

              <div className="w-[20%] text-center text-sm text-gray-500 dark:text-gray-400">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
              </div>

              <div className="w-[20%]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 rounded-full" style={getProgressStyle(task.status)} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.status || 0}%
                  </span>
                </div>
              </div>

              <div className="w-[15%] flex justify-end gap-4">
                <IoEye
                  onClick={() => openViewModal(task)}
                  className="cursor-pointer text-gray-500 hover:text-blue-500"
                />
                <FaEdit
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                  className="cursor-pointer text-gray-500 hover:text-amber-500"
                />
                <FaTrash
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                />
              </div>
            </div>
          ))
        ) : <EmptyState />}
      </div>
    </div>
  );
};

export default TaskRow;
