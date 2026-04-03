import React, { useContext, useEffect, useState, useRef } from "react";
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
import { TaskContext } from "../context/TasksContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleFilterSelect = (value) => {
    const newFilter = value === "All" ? "" : value;
    setPriorityFilter(newFilter);
    setOpenFilter(false);
  };

  return (
    <div className="px-[100px] flex flex-col max-w-[1440px] gap-[50px] relative">
      <div className="flex items-center py-[30px] justify-between">
        <h3 className="font-[Caveat] font-bold text-[30px]">
          Welcome! {user?.name || "User"}
        </h3>
        <div className="flex gap-4">
          <button
            className="w-[163px] h-[40px] rounded-[22px] bg-[#77C2FF] border shadow-[0_4px_0_0_black]"
            onClick={() => setShowModal1(true)}
          >
            Create new task
          </button>

          {user?.role === "admin" && (
            <button
              className="w-[163px] h-[40px] rounded-[22px] bg-[#FFB347] border shadow-[0_4px_0_0_black]"
              onClick={() => navigate("/authdash")}
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </div>

      <TaskSummaryCard />
      <Carousel />

      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-[Caveat] font-bold">
            All Created Tasks
          </h2>

          {/* Priority Filter */}
          <div ref={dropdownRef} className="relative flex items-center gap-3">
            <p className="font-medium">Priority</p>
            <div
              className="border flex items-center justify-between w-[140px] h-[44px] px-4 rounded-[22px] cursor-pointer bg-white"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <p>{priorityFilter || "All"}</p>
              <img
                src={arr}
                alt="arrow"
                className={`w-5 transition-transform ${openFilter ? "rotate-180" : ""}`}
              />
            </div>

            {openFilter && (
              <div className="absolute top-14 right-0 w-[140px] bg-white border rounded-xl shadow-lg z-50 py-1">
                {["All", "high", "medium", "low"].map((item) => (
                  <p
                    key={item}
                    className={`px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-center ${
                      (priorityFilter || "All") === item
                        ? "bg-gray-100 font-medium"
                        : ""
                    }`}
                    onClick={() => handleFilterSelect(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-[842px] mb-10 rounded-[30px] border border-b-4 shadow-[0_4px_0_0_black] overflow-hidden bg-white">
          <div className="flex border-b bg-[#FBFBFB]">
            <p className="w-[403px] py-5 px-8 font-semibold">Name</p>
            <p className="w-[146px] py-5 px-8 font-semibold">Priority</p>
            <p className="w-[236px] py-5 px-8 font-semibold">Date</p>
            <p className="w-[236px] py-5 px-8 font-semibold">Status</p>
            <p className="w-[237px] py-5 px-8 font-semibold">Action</p>
          </div>

          <div className="h-[700px]">
            <TaskRow
              tasks={tasks}
              setSelectedTask={setSelectedTask}
              openUpdateModal={() => setShowModal2(true)}
              openDeleteModal={() => setShowDeleteModal(true)}
            />
          </div>

        
            <div className="flex justify-between px-8 py-4 border-t">
              <p>
                Page {page} of {totalPages || 1}
              </p>
              <div className="flex items-center gap-3">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => hasPrevPage && setPage(page - 1)}
                  className={`text-2xl cursor-pointer ${!hasPrevPage ? "opacity-40" : ""}`}
                />
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                  (num) => (
                    <p
                      key={num}
                      onClick={() => setPage(num)}
                      className={`cursor-pointer px-3 py-1 rounded ${num === page ? "font-bold underline" : ""}`}
                    >
                      {num}
                    </p>
                  ),
                )}
                <MdOutlineKeyboardArrowRight
                  onClick={() => hasNextPage && setPage(page + 1)}
                  className={`text-2xl cursor-pointer ${!hasNextPage ? "opacity-40" : ""}`}
                />
              </div>
            </div>
          
        </div>
      </div>

      {/* Modals */}
      {showModal1 && (
        <div className="fixed overflow-y-auto inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <CreateModal
            closeModal={() => setShowModal1(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal2 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <UpdateModal
            task={selectedTask}
            closeModal={() => setShowModal2(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <DeleteModal
            task={selectedTask}
            closeModal={() => setShowDeleteModal(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}

      {showModal3 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <SuccessModal closeModal={() => setShowModal3(false)} />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
