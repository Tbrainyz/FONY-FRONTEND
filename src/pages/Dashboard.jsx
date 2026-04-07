// DashBoard.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TaskSummaryCard from "../components/TaskSummaryCard";
import Carousel from "../components/Carousel";           // ← Still named Carousel
import arr from "../assets/AltArrow.svg";
import CreateModal from "../components/CreateModal";
import UpdateModal from "../components/UpdateModal";
import SuccessModal from "../components/SuccessModal";
import DeleteModal from "../components/DeleteModal";
import TaskRow from "../components/TaskRow";
import TaskViewModal from "../components/TaskViewModal";
import { TaskContext } from "../context/TasksContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewedTask, setViewedTask] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const dropdownRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    tasks,
    fetchTasks,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    priorityFilter,
    setPriorityFilter,
    setPage,
  } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks(page, priorityFilter || "");
  }, [page, priorityFilter, fetchTasks]);

  useEffect(() => {
    setPage(1);
  }, [priorityFilter, setPage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  const handleFilterSelect = (value) => {
    const newFilter = value === "All" ? "" : value;
    setPriorityFilter(newFilter);
    setOpenFilter(false);
  };

  // Open Modals Functions
  const openUpdateModal = () => setShowModal2(true);

  const openDeleteModal = () => setShowDeleteModal(true);

  const openViewModal = (task) => {
    setViewedTask(task);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-6 px-4 sm:px-6 lg:px-8 xl:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:gap-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl text-gray-900 dark:text-white">
            Welcome! {user?.name || "User"}
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowModal1(true)}
              className="w-full sm:w-[170px] h-11 rounded-2xl bg-[#77C2FF] border-2 border-black shadow-[0_4px_0_0_black] 
                         font-medium active:translate-y-0.5 transition-all 
                         dark:border-white dark:shadow-[0_4px_0_0_#ffffff] dark:text-black"
            >
              Create new task
            </button>
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/authdash")}
                className="w-full sm:w-[170px] h-11 rounded-2xl bg-[#FFB347] border-2 border-black shadow-[0_4px_0_0_black] 
                           font-medium active:translate-y-0.5 transition-all
                           dark:border-white dark:shadow-[0_4px_0_0_#ffffff]"
              >
                Admin Dashboard
              </button>
            )}
          </div>
        </div>

        <TaskSummaryCard />

        {/* Carousel Section - Now with proper props */}
        <Carousel
          tasks={tasks}
          setSelectedTask={setSelectedTask}
          openUpdateModal={openUpdateModal}
          openDeleteModal={openDeleteModal}
          openViewModal={openViewModal}
        />

        {/* All Tasks Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
              All Created Tasks
            </h2>

            {/* Priority Filter */}
            <div ref={dropdownRef} className="relative flex items-center gap-3">
              <p className="font-medium text-gray-700 dark:text-gray-300">Priority</p>
              <div
                className="border border-gray-300 dark:border-gray-700 flex items-center justify-between 
                           w-full sm:w-[160px] h-11 px-4 rounded-2xl cursor-pointer 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <p className="capitalize">{priorityFilter || "All"}</p>
                <img
                  src={arr}
                  alt="arrow"
                  className={`w-4 transition-transform ${openFilter ? "rotate-180" : ""}`}
                />
              </div>

              {openFilter && (
                <div className="absolute top-12 right-0 w-[160px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                               rounded-xl shadow-lg z-50 py-1">
                  {["All", "high", "medium", "low"].map((item) => (
                    <p
                      key={item}
                      onClick={() => handleFilterSelect(item)}
                      className={`px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-center capitalize 
                        text-gray-700 dark:text-gray-300
                        ${(priorityFilter || "All") === item 
                          ? "bg-gray-100 dark:bg-gray-800 font-medium" 
                          : ""}`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Table Container */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden lg:flex bg-[#FBFBFB] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-semibold text-base">
              <p className="w-[30%] py-5 px-6 text-gray-700 dark:text-gray-300">Task Name</p>
              <p className="w-[15%] text-center py-5 px-6 text-gray-700 dark:text-gray-300">Priority</p>
              <p className="w-[20%] text-center py-5 px-6 text-gray-700 dark:text-gray-300">Date</p>
              <p className="w-[20%] py-5 px-6 text-gray-700 dark:text-gray-300">Status</p>
              <p className="w-[15%] text-center py-5 px-6 text-gray-700 dark:text-gray-300">Actions</p>
            </div>

            {/* Task Rows */}
            <div className="min-h-[500px]">
              <TaskRow
                tasks={tasks}
                setSelectedTask={setSelectedTask}
                openUpdateModal={openUpdateModal}
                openDeleteModal={openDeleteModal}
                openViewModal={openViewModal}
              />
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages || 1}
              </p>
              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => hasPrevPage && setPage(page - 1)}
                  className={`text-3xl cursor-pointer text-gray-700 dark:text-gray-300 
                    ${!hasPrevPage ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
                />
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((num) => (
                  <p
                    key={num}
                    onClick={() => setPage(num)}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm transition-colors
                      ${num === page 
                        ? "bg-black text-white dark:bg-white dark:text-black font-bold" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                  >
                    {num}
                  </p>
                ))}
                <MdOutlineKeyboardArrowRight
                  onClick={() => hasNextPage && setPage(page + 1)}
                  className={`text-3xl cursor-pointer text-gray-700 dark:text-gray-300 
                    ${!hasNextPage ? "opacity-40" : "hover:text-black dark:hover:text-white"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal1 && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
          <CreateModal
            closeModal={() => setShowModal1(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal2 && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
          <UpdateModal
            task={selectedTask}
            closeModal={() => setShowModal2(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
          <DeleteModal
            task={selectedTask}
            closeModal={() => setShowDeleteModal(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal3 && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
          <SuccessModal closeModal={() => setShowModal3(false)} />
        </div>
      )}

      {showViewModal && viewedTask && (
        <TaskViewModal
          task={viewedTask}
          onClose={() => {
            setShowViewModal(false);
            setViewedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default DashBoard;