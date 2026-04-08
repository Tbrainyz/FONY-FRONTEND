import React from "react";
import { IoClose } from "react-icons/io5";

const TaskViewModal = ({ task, onClose }) => {
  if (!task) return null;

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400";
    if (prio === "medium") return "bg-orange-100 dark:bg-orange-900/30 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400";
    if (prio === "low") return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400";
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
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="scrollable-content flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Task Image */}
          {task.image && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-auto object-cover max-h-[300px]"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {task.title}
            </h1>
          </div>

          {/* Priority & Status Row */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority</p>
              <span
                className={`inline-block px-5 py-2 text-sm font-medium rounded-2xl border ${getPriorityClass(task.priority)}`}
              >
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "—"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 w-40 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(task.status)}`}
                    style={{ width: `${task.status || 0}%` }}
                  />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {task.status || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Description - FIXED WRAPPING */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 min-h-[120px]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words break-all">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Created On</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
              </p>
            </div>
            {task.dueDate && (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white font-medium rounded-2xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;