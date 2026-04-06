import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";   // Optional: if you want to add View later
import { TaskContext } from "../context/TasksContext";

const Carousel = () => {
  const { tasks = [] } = React.useContext(TaskContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const inProgressTasks = tasks.filter((task) => task?.status >= 0 && task?.status < 100);

  // Progress style - Same as TaskRow
  const getProgressStyle = (progress = 0) => {
    let backgroundColor;

    if (progress <= 25) {
      backgroundColor = "#fe2903";      // Red
    } else if (progress <= 50) {
      backgroundColor = "#FFA500";      // Orange
    } else if (progress <= 75) {
      backgroundColor = "#90EE90";      // Light Green
    } else {
      backgroundColor = "#339933";      // Dark Green
    }

    return {
      width: `${progress}%`,
      backgroundColor,
      transition: "width 0.4s ease-in-out",
    };
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Tasks In Progress
      </h3>

      {inProgressTasks.length > 0 ? (
        <div className="carousel flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
          {inProgressTasks.map((task, index) => (
            <div
              key={task._id || index}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] 
                         bg-white dark:bg-gray-900 
                         border border-b-4 border-black dark:border-white 
                         rounded-3xl shadow-md overflow-hidden snap-start transition-all"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={task.image || "/default-image.png"}
                  alt={task.title}
                  className="w-full h-40 sm:h-44 object-cover object-[center_top]"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium px-3 py-1 border border-red-500 text-red-600 
                                   dark:border-red-400 dark:text-red-400 rounded-full">
                    {task.priority || "—"}
                  </span>

                  {/* Replaced image with FaEdit icon - consistent with TaskRow */}
                  <FaEdit
                    onClick={() => {
                      setSelectedTask(task);
                      setShowUpdateModal(true);
                    }}
                    className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 
                               hover:text-amber-600 dark:hover:text-amber-400 
                               transition-colors active:scale-95"
                  />
                </div>

                <p className="text-lg font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-white">
                  {task.title}
                </p>

                {/* Updated Progress Bar - Same styling as TaskRow */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={getProgressStyle(task.status)}
                    />
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {task.status || 0}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-600 
                        rounded-3xl p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No tasks in progress yet
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#77C2FF] hover:bg-[#66b3f0] text-black px-6 py-3 rounded-2xl 
                       font-medium border border-black dark:border-white 
                       shadow-md active:translate-y-0.5 transition-all"
          >
            Create New Task
          </button>
        </div>
      )}

      {/* Modals */}
      {showUpdateModal && selectedTask && (
        <UpdateModal
          task={selectedTask}
          closeModal={() => setShowUpdateModal(false)}
          openNextModal={() => setShowSuccessModal(true)}
        />
      )}

      {showSuccessModal && (
        <SuccessModal closeModal={() => setShowSuccessModal(false)} />
      )}

      {showCreateModal && (
        <CreateModal
          closeModal={() => setShowCreateModal(false)}
          openNextModal={() => setShowSuccessModal(true)}
        />
      )}
    </div>
  );
};

export default Carousel;