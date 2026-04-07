// components/Carousel.jsx
import React, { useContext } from "react";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskContext } from "../context/TasksContext";

const Carousel = ({
  tasks = [],
  setSelectedTask,
  openUpdateModal,
  openDeleteModal,
  openViewModal,
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getProgressStyle = (progress = 0) => {
    let backgroundColor;
    if (progress <= 25) backgroundColor = "#fe2903";
    else if (progress <= 50) backgroundColor = "#FFA500";
    else if (progress <= 75) backgroundColor = "#90EE90";
    else backgroundColor = "#339933";

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

  // Handle clicks safely (prevents carousel drag from blocking buttons)
  const handleAction = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700">
        No tasks available
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-6 px-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="min-w-[320px] sm:min-w-[340px] flex-shrink-0 snap-start pointer-events-auto"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow transition-all h-full">
                {/* Task Header */}
                <div className="flex justify-between items-start mb-4">
                  <p className="font-semibold text-lg leading-tight pr-4 text-gray-900 dark:text-white">
                    {task.title}
                  </p>
                  <span
                    className={`inline-block px-4 py-1 text-sm font-medium rounded-2xl border ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority || "—"}
                  </span>
                </div>

                {/* Date and Progress */}
                <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                  <p>
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString("en-GB")
                      : "—"}
                  </p>
                  <p className="font-medium">{task.status || 0}%</p>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-3 rounded-full"
                    style={getProgressStyle(task.status)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6 pt-2">
                  <IoEye
                    onClick={(e) => handleAction(e, () => openViewModal(task))}
                    className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  />
                  <FaEdit
                    onClick={(e) =>
                      handleAction(e, () => {
                        setSelectedTask(task);
                        openUpdateModal();
                      })
                    }
                    className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  />
                  <FaTrash
                    onClick={(e) =>
                      handleAction(e, () => {
                        setSelectedTask(task);
                        openDeleteModal();
                      })
                    }
                    className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tasks.length > 2 && (
        <p className="text-center text-xs text-gray-400 mt-3">
          ← Scroll horizontally to see more tasks →
        </p>
      )}
    </div>
  );
};

export default Carousel;