import React, { useContext, useEffect, useRef, useState } from "react";
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

  const inProgressTasks = tasks.filter((t) => (t.status || 0) < 100);

  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const directionRef = useRef(1);
  const isHoveredRef = useRef(false);

  const [isUserScrolling, setIsUserScrolling] = useState(false);

  /* ---------------- PROGRESS ---------------- */
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
    const p = priority.toLowerCase();

    if (p === "high")
      return "bg-red-100/80 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400";
    if (p === "medium")
      return "bg-orange-100/80 dark:bg-orange-900/30 border-orange-500 text-orange-600 dark:text-orange-400";
    if (p === "low")
      return "bg-blue-100/80 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400";

    return "";
  };

  const ActionIcon = ({ children, onClick, hover }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`p-2 rounded-xl cursor-pointer transition-all
      text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      hover:scale-110 ${hover}`}
    >
      {children}
    </div>
  );

  /* ---------------- AUTO SCROLL ---------------- */
  const startAutoScroll = () => {
    if (intervalRef.current || inProgressTasks.length <= 1) return;

    intervalRef.current = setInterval(() => {
      if (isHoveredRef.current || isUserScrolling) return;

      const container = scrollRef.current;
      if (!container) return;

      const cardWidth = container.children[0]?.offsetWidth || 320;
      const gap = 24;
      const step = (cardWidth + gap) * directionRef.current;

      let next = container.scrollLeft + step;

      if (
        next >= container.scrollWidth - container.clientWidth - 10 &&
        directionRef.current === 1
      ) {
        directionRef.current = -1;
        next = container.scrollLeft - (cardWidth + gap);
      }

      if (next <= 0 && directionRef.current === -1) {
        directionRef.current = 1;
        next = container.scrollLeft + (cardWidth + gap);
      }

      container.scrollTo({
        left: next,
        behavior: "smooth",
      });
    }, 3500);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  /* ---------------- USER SCROLL DETECT ---------------- */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1500);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------- TAB VISIBILITY ---------------- */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAutoScroll();
      else startAutoScroll();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [inProgressTasks.length]);

  /* ---------------- EMPTY ---------------- */
  if (inProgressTasks.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-[Caveat] font-bold mb-6 text-gray-900 dark:text-white">
          Tasks in Progress
        </h2>

        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center">
          <FaTasks className="text-4xl mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No tasks in progress
          </p>

          <button
            onClick={openCreateModal}
            className="mt-4 px-5 py-2 rounded-xl bg-[#77C2FF] text-white font-medium shadow hover:scale-105 transition"
          >
            + Create Task
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
          {inProgressTasks.length} task
          {inProgressTasks.length > 1 && "s"}
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth scrollable-content"
        onMouseEnter={() => {
          isHoveredRef.current = true;
          stopAutoScroll();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          startAutoScroll();
        }}
      >
        <div className="flex gap-6 px-2 pb-4">
          {inProgressTasks.map((task) => (
            <div key={task._id} className="min-w-[320px] snap-start group">
              <div
                onClick={() => openViewModal(task)}
                className="cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                border border-gray-200 dark:border-gray-800
                rounded-3xl overflow-hidden shadow-md
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-3xl text-gray-400">
                      📋
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between mb-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </p>

                    <span className={`text-xs px-3 py-1 rounded-xl border ${getPriorityClass(task.priority)}`}>
                      {task.priority || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <p>
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString("en-GB")
                        : "—"}
                    </p>
                    <p>{task.status || 0}%</p>
                  </div>

                  {/* PROGRESS */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-2 ${getProgressStyle(task.status)}`}
                      style={{ width: `${task.status || 0}%` }}
                    />
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <ActionIcon onClick={() => openViewModal(task)} hover="hover:text-blue-500">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
