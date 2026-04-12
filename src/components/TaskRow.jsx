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
  openCreateModal,
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getProgressStyle = (progress = 0) => {
    let gradient;

    if (progress <= 25) gradient = "from-red-400 to-red-600";
    else if (progress <= 50) gradient = "from-yellow-400 to-orange-500";
    else if (progress <= 75) gradient = "from-green-400 to-green-600";
    else gradient = "from-emerald-500 to-emerald-700";

    return `bg-gradient-to-r ${gradient}`;
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high")
      return "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400";
    if (prio === "medium")
      return "bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-600 dark:text-orange-400";
    if (prio === "low")
      return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400";
    return "";
  };

  // ✅ FIXED ICON COMPONENT (dark mode visible)
  const ActionIcon = ({ children, onClick, hover }) => (
    <div
      onClick={onClick}
      className={`p-2 rounded-lg cursor-pointer transition-all
      text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      hover:scale-110
      ${hover}`}
    >
      {children}
    </div>
  );

  const EmptyState = () => (
    <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        No tasks created yet
      </p>

      <button
        onClick={openCreateModal}
        className="mt-4 px-5 py-2 rounded-xl bg-[#77C2FF] text-white text-sm font-medium
        shadow hover:shadow-lg hover:scale-[1.03] transition-all"
      >
        + Create new task
      </button>
    </div>
  );

  return (
    <div>
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 
              rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between mb-3">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </p>

                <span
                  className={`px-3 py-1 text-xs rounded-xl border ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <p>
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString("en-GB")
                    : "—"}
                </p>
                <p className="font-medium">{task.status || 0}%</p>
              </div>

              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-2 ${getProgressStyle(task.status)}`}
                  style={{ width: `${task.status || 0}%` }}
                />
              </div>

              <div className="flex gap-2">
                <ActionIcon
                  onClick={() => openViewModal(task)}
                  hover="hover:text-blue-500"
                >
                  <IoEye />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    setSelectedTask(task);
                    openUpdateModal();
                  }}
                  hover="hover:text-amber-500"
                >
                  <FaEdit />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    setSelectedTask(task);
                    openDeleteModal();
                  }}
                  hover="hover:text-red-500"
                >
                  <FaTrash />
                </ActionIcon>
              </div>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800 
              hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-all
              hover:shadow-sm ${
                index % 2 ? "bg-gray-50 dark:bg-gray-800/40" : ""
              }`}
            >
              <div className="w-[30%] font-medium text-gray-900 dark:text-white">
                {task.title}
              </div>

              <div className="w-[15%] text-center">
                <span
                  className={`px-3 py-1 text-xs rounded-xl border ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="w-[20%] text-center text-sm text-gray-500 dark:text-gray-400">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("en-GB")
                  : "—"}
              </div>

              <div className="w-[20%]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${getProgressStyle(task.status)}`}
                      style={{ width: `${task.status || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    {task.status || 0}%
                  </span>
                </div>
              </div>

              {/* ✅ FIXED ICON VISIBILITY */}
              <div className="w-[15%] flex justify-end gap-2">
                <ActionIcon
                  onClick={() => openViewModal(task)}
                  hover="hover:text-blue-500"
                >
                  <IoEye size={18} />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    setSelectedTask(task);
                    openUpdateModal();
                  }}
                  hover="hover:text-amber-500"
                >
                  <FaEdit size={16} />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    setSelectedTask(task);
                    openDeleteModal();
                  }}
                  hover="hover:text-red-500"
                >
                  <FaTrash size={16} />
                </ActionIcon>
              </div>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default TaskRow;
