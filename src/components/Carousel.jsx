import React, { useContext, useEffect, useRef } from "react";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash, FaTasks } from "react-icons/fa";
import { TaskContext } from "../context/TasksContext";

const Carousel = ({
  tasks = [],
  setSelectedTask,
  openUpdateModal,
  openDeleteModal,
  openViewModal,
  openCreateModal,
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  const inProgressTasks = tasks.filter((task) => (task.status || 0) < 100);

  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);

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

  const handleAction = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  // AUTO SCROLL
  const startAutoScroll = () => {
    if (intervalRef.current || inProgressTasks.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const cardWidth = container.children[0]?.offsetWidth || 320;
      const gap = 24;

      let newScrollLeft = container.scrollLeft + cardWidth + gap;

      if (newScrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        newScrollLeft = 0;
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }, 4500); // smoother timing
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [inProgressTasks.length]);

  // EMPTY STATE (cleaner)
  if (inProgressTasks.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-[Caveat] font-bold mb-6 text-gray-900 dark:text-white">
          Tasks in Progress
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <FaTasks className="text-3xl text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No tasks in progress yet
          </p>

          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
          >
            + Create new task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
          Tasks in Progress
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {inProgressTasks.length} task{inProgressTasks.length > 1 && "s"}
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <div className="flex gap-6 px-2 pb-4">
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="min-w-[300px] sm:min-w-[320px] snap-start"
            >
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">

                {/* IMAGE */}
                <div className="h-44 bg-gray-100 dark:bg-gray-800">
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      📋
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between mb-3">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.title}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-lg border ${getPriorityClass(task.priority)}`}>
                      {task.priority || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}</p>
                    <p>{task.status || 0}%</p>
                  </div>

                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                    <div className="h-2 rounded-full" style={getProgressStyle(task.status)} />
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between mt-auto pt-3">
                    <IoEye
                      onClick={(e) => handleAction(e, () => openViewModal(task))}
                      className="cursor-pointer text-gray-500 hover:text-blue-500"
                    />

                    <FaEdit
                      onClick={(e) =>
                        handleAction(e, () => {
                          setSelectedTask(task);
                          openUpdateModal();
                        })
                      }
                      className="cursor-pointer text-gray-500 hover:text-amber-500"
                    />

                    <FaTrash
                      onClick={(e) =>
                        handleAction(e, () => {
                          setSelectedTask(task);
                          openDeleteModal();
                        })
                      }
                      className="cursor-pointer text-gray-500 hover:text-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
