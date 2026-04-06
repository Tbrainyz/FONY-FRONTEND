import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const ViewModal = ({ task, onClose }) => {
  if (!task) return null;

  const getPriorityStyle = (priority) => {
    if (!priority) return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";

    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800";
    if (prio === "medium") return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800";
    if (prio === "low") return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
    return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getProgressColor = (status = 0) => {
    if (status === 100) return "bg-green-500";
    if (status >= 75) return "bg-[#77C2FF]";
    if (status >= 50) return "bg-blue-500";
    if (status >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const isCompleted = task.status === 100 || task.completed === true;

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Details
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <IoClose size={32} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Task Image (if exists) */}
          {task.image && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 -mx-1">
              <img
                src={task.image}
                alt={task.title || task.name}
                className="w-full h-auto object-cover max-h-[280px]"
              />
            </div>
          )}

          {/* Task Title */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Task Name</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
              {task.name || task.title || "Untitled Task"}
            </p>
          </div>

          {/* Priority */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority</p>
            <span 
              className={`inline-block px-5 py-2 text-sm font-medium rounded-2xl ${getPriorityStyle(task.priority)}`}
            >
              {task.priority 
                ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) 
                : "—"}
            </span>
          </div>

          {/* Progress / Status */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Progress</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date Created</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {task.date || (task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—")}
              </p>
            </div>
            
            {task.dueDate && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 min-h-[120px]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {task.description 
                  ? task.description 
                  : "No description provided for this task."}
              </p>
            </div>
          </div>

          {/* Success Banner - Only show when completed */}
          {isCompleted && (
            <div className="flex items-center justify-center gap-3 py-5 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900">
              <FaCheckCircle className="text-4xl text-green-500 dark:text-green-400" />
              <div>
                <p className="font-semibold text-green-700 dark:text-green-300">
                  Task Completed Successfully
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Great job!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 dark:border-gray-700 flex justify-end bg-white dark:bg-gray-900">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                       text-gray-700 dark:text-gray-300 font-medium rounded-2xl transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;