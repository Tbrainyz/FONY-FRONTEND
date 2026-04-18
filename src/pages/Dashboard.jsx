import React, { useState, useContext, useEffect, useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TaskSummaryCard from "../components/TaskSummaryCard";
import Carousel from "../components/Carousel";
import arr from "../assets/AltArrow.svg";
import CreateModal from "../components/CreateModal";
import UpdateModal from "../components/UpdateModal";
import SuccessModal from "../components/SuccessModal";
import DeleteModal from "../components/DeleteModal";
import TaskRow from "../components/TaskRow";
import TaskViewModal from "../components/TaskViewModal";
import { TasksContext } from "../context/TasksContext";
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
  } = useContext(TasksContext);

  useEffect(() => {
    fetchTasks(page, priorityFilter || "");
  }, [page, priorityFilter, fetchTasks]);

  useEffect(() => {
    setPage(1);
  }, [priorityFilter, setPage]);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterSelect = (value) => {
    const newFilter = value === "All" ? "" : value;
    setPriorityFilter(newFilter);
    setOpenFilter(false);
  };

  const openUpdateModal = () => setShowModal2(true);
  const openDeleteModal = () => setShowDeleteModal(true);

  const openViewModal = (task) => {
    setViewedTask(task);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <h3 className="font-[Caveat] font-bold text-3xl md:text-4xl text-gray-900 dark:text-white">
            Welcome! {user?.name || "User"}
          </h3>

          <button
            onClick={() => setShowModal1(true)}
            className="w-full sm:w-[180px] h-11 rounded-2xl 
              bg-[#77C2FF] border-2 border-black dark:border-white 
              shadow-[0_4px_0_0_black] dark:shadow-[0_4px_0_0_#ffffff]
              font-medium active:translate-y-0.5 
              hover:scale-[1.03] hover:shadow-lg transition-all"
          >
            Create new task
          </button>
        </div>

        {/* SUMMARY (add glass feel) */}
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-3xl p-4 shadow-lg">
          <TaskSummaryCard />
        </div>

        {/* CAROUSEL */}
        <div className="w-full">
          <Carousel
            tasks={tasks}
            setSelectedTask={setSelectedTask}
            openUpdateModal={openUpdateModal}
            openDeleteModal={openDeleteModal}
            openViewModal={openViewModal}
            openCreateModal={() => setShowModal1(true)}
          />
        </div>

        {/* TASK TABLE */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-[Caveat] font-bold text-gray-900 dark:text-white">
              All Created Tasks
            </h2>

            {/* FILTER */}
            <div ref={dropdownRef} className="relative flex items-center gap-3">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Priority
              </p>

              <div
                className="border border-gray-300 dark:border-gray-700 flex items-center justify-between 
                  w-[150px] h-11 px-4 rounded-2xl cursor-pointer 
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  hover:shadow-md transition"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <p className="capitalize">{priorityFilter || "All"}</p>
                <img
                  src={arr}
                  alt="arrow"
                  className={`w-4 transition-transform dark:invert ${openFilter ? "rotate-180" : ""}`}
                />
              </div>

              {openFilter && (
                <div className="absolute top-12 right-0 w-[150px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                  rounded-xl shadow-xl z-50 py-1 backdrop-blur-md">
                  {["All", "high", "medium", "low"].map((item) => (
                    <p
                      key={item}
                      onClick={() => handleFilterSelect(item)}
                      className={`px-4 py-2 text-sm cursor-pointer text-center capitalize
                      ${
                        (priorityFilter || "All") === item
                          ? "bg-gray-100 dark:bg-gray-800 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">

            {/* HEADER */}
            <div className="hidden lg:flex bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm">
              <p className="w-[30%] py-4 px-6 text-gray-700 dark:text-gray-300">Task Name</p>
              <p className="w-[15%] text-center py-4 px-6 text-gray-700 dark:text-gray-300">Priority</p>
              <p className="w-[20%] text-center py-4 px-6 text-gray-700 dark:text-gray-300">Date</p>
              <p className="w-[20%] py-4 px-6 text-gray-700 dark:text-gray-300">Status</p>
              <p className="w-[15%] text-center py-4 px-6 text-gray-700 dark:text-gray-300">Actions</p>
            </div>

            {/* ROWS */}
            <div className="min-h-[500px]">
              <TaskRow
                tasks={tasks}
                setSelectedTask={setSelectedTask}
                openUpdateModal={openUpdateModal}
                openDeleteModal={openDeleteModal}
                openViewModal={openViewModal}
                openCreateModal={() => setShowModal1(true)}
              />
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages || 1}
              </p>

              <div className="flex items-center gap-2">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => hasPrevPage && setPage(page - 1)}
                  className={`text-3xl p-1.5 rounded-lg transition-all
                  ${
                    hasPrevPage
                      ? "text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110"
                      : "opacity-30 text-gray-400 dark:text-gray-600"
                  }`}
                />

                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                  (num) => (
                    <p
                      key={num}
                      onClick={() => setPage(num)}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm transition
                      ${
                        num === page
                          ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {num}
                    </p>
                  )
                )}

                <MdOutlineKeyboardArrowRight
                  onClick={() => hasNextPage && setPage(page + 1)}
                  className={`text-3xl p-1.5 rounded-lg transition-all
                  ${
                    hasNextPage
                      ? "text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110"
                      : "opacity-30 text-gray-400 dark:text-gray-600"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS (unchanged) */}
      {showModal1 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <CreateModal
            closeModal={() => setShowModal1(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal2 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <UpdateModal
            task={selectedTask}
            closeModal={() => setShowModal2(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <DeleteModal
            task={selectedTask}
            closeModal={() => setShowDeleteModal(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal3 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
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
