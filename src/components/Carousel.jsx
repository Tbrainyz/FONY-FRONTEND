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

  // Filter only tasks that are NOT 100% completed
  const inProgressTasks = tasks.filter(task => (task.status || 0) < 100);

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

  const handleAction = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  if (inProgressTasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No tasks in progress</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
          Tasks in Progress
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {inProgressTasks.length} task{inProgressTasks.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Carousel Scroll Area */}
      <div className="overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-6 px-2">
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="min-w-[300px] sm:min-w-[340px] flex-shrink-0 snap-start pointer-events-auto"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                
                {/* Image Section - This is what was missing */}
                <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow">
                          📋
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">No image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title + Priority */}
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

                  {/* Date + Status */}
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
                  <div className="flex gap-6 mt-auto pt-4">
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
            </div>
          ))}
        </div>
      </div>

      {inProgressTasks.length > 2 && (
        <p className="text-center text-xs text-gray-400 mt-2">
          ← Scroll horizontally to see more →
        </p>
      )}
    </div>
  );
};

export default Carousel;