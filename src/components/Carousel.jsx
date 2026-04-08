// components/Carousel.jsx
import React, { useContext, useEffect, useRef } from "react";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
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

  // Filter only tasks that are NOT 100% completed
  const inProgressTasks = tasks.filter(task => (task.status || 0) < 100);

  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);

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

  // Auto-scroll functionality
  const startAutoScroll = () => {
    if (intervalRef.current || inProgressTasks.length <= 1) return;

    intervalRef.current = setInterval(() => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 340;
      const gap = 24;

      let newScrollLeft = container.scrollLeft + cardWidth + gap;

      if (newScrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        newScrollLeft = 0;
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeAutoScroll = () => {
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [inProgressTasks.length]);

  // Empty State
  if (inProgressTasks.length === 0) {
    return (
 <div>
  {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
          Tasks in Progress
        </h2>
      </div>
      
      
      <div className="mt-3 w-full md:max-w-xs rounded-2xl border border-black shadow-md shadow-black">
        
        <div className="flex items-center justify-center border-b border-black rounded-2xl bg-[#F4F4F4] py-12">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F4F4F4] border border-[#666666] shadow-md shadow-[#666666]">
            <div className="bg-[#666666] p-[2px] rounded-md">
              <FaTasks className="text-[#F4F4F4] text-sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-6">
          <p className="mt-4 text-sm font-medium">No Task in Progress yet</p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-4 w-[7.5rem] inline-flex items-center gap-2 rounded-full bg-[#77C2FF] px-4 py-2 text-xs font-medium text-black shadow-md shadow-black border border-black"
          >
            Create new task
          </button>
        </div>
      </div>
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

      {/* Auto-scrolling Carousel */}
      <div
        ref={scrollContainerRef}
        className="scrollable-content overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={resumeAutoScroll}
      >
        <div className="flex gap-6 px-2">
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="min-w-[300px] sm:min-w-[340px] flex-shrink-0 snap-start pointer-events-auto"
            >
              <div className="bg-white text-wrap dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                {/* Image Section */}
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
                        <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow text-3xl">
                          📋
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">No image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
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

                  <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString("en-GB")
                        : "—"}
                    </p>
                    <p className="font-medium">{task.status || 0}%</p>
                  </div>

                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                    <div className="h-3 rounded-full" style={getProgressStyle(task.status)} />
                  </div>

                  <div className="flex justify-between mt-auto pt-4">
                    <IoEye
                      onClick={(e) => handleAction(e, () => openViewModal(task))}
                      className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
    </div>
  );
};

export default Carousel;