import React from "react";
import { IoClose } from "react-icons/io5";

const TaskViewModal = ({ task, onClose }) => {
  if (!task) return null;

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();

    if (prio === "high")
      return "bg-red-500/10 border-red-500/40 text-red-500";
    if (prio === "medium")
      return "bg-orange-500/10 border-orange-500/40 text-orange-500";
    if (prio === "low")
      return "bg-blue-500/10 border-blue-500/40 text-blue-500";

    return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getProgressColor = (status = 0) => {
    if (status === 100) return "bg-green-500";
    if (status >= 75) return "bg-[#77C2FF]";
    if (status >= 50) return "bg-blue-500";
    if (status >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-[-100px] left-[-100px] rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>
      </div>

      {/* Modal */}
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-[28px] border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition"
          >
            <IoClose size={26} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 scrollable-content overflow-y-auto p-6 space-y-8">

          {/* Image */}
          {task.image && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 group">
              <img
                src={task.image}
                alt={task.title}
                className="w-full max-h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {task.title}
          </h1>

          {/* Priority + Status */}
          <div className="flex flex-wrap gap-6">

            {/* Priority */}
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Priority
              </p>
              <span
                className={`px-5 py-2 text-sm font-semibold rounded-full border ${getPriorityClass(
                  task.priority
                )}`}
              >
                {task.priority
                  ? task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)
                  : "—"}
              </span>
            </div>

            {/* Status */}
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Progress
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div
                    className={`h-3 rounded-full ${getProgressColor(
                      task.status
                    )} transition-all duration-500`}
                    style={{ width: `${task.status || 0}%` }}
                  />

                  {/* Glow effect */}
                  <div
                    className="absolute top-0 left-0 h-3 bg-white/30 blur-md"
                    style={{ width: `${task.status || 0}%` }}
                  />
                </div>

                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {task.status || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
              Description
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Created</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>

            {task.dueDate && (
              <div>
                <p className="text-gray-500">Due</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#77C2FF] to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;
