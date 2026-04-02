import React, { useContext, useEffect, useState } from "react";
import del from "../assets/Del.svg";
import { IoEye } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import ViewModal from "../components/ViewModal";
import PriorityDropdown from "../components/PriorityDropdown";
import { TaskContext } from "../context/TasksContext";

const CompletedPage = () => {
  const {
    tasks,
    fetchTasks,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    loading,
    priorityFilter,
    setPriorityFilter,
  } = useContext(TaskContext);

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch ONLY completed tasks (status = 100)
  useEffect(() => {
    fetchTasks(currentPage, priorityFilter || "", 100); // Third parameter = status
  }, [currentPage, priorityFilter, fetchTasks]);

  // Reset to page 1 when priority changes
  useEffect(() => {
    setCurrentPage(1);
  }, [priorityFilter]);

  const handleFilter = (value) => {
    const filterValue = value === "All" ? "" : value;
    setPriorityFilter(filterValue);
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";

    const prio = priority.toLowerCase();
    if (prio === "high") {
      return "border border-[#FF0000] text-[#FF0000] bg-[#FFF0F0]";
    } else if (prio === "medium") {
      return "border border-[#FF9800] bg-[#FFF4E0] text-[#FF9800]";
    } else if (prio === "low") {
      return "border border-[#448AFF] bg-[#EEF4FF] text-[#448AFF]";
    }
    return "";
  };

  return (
    <div className="space-y-6 w-full max-w-[1200px] mt-10 mx-auto px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] font-[Caveat] font-extrabold">
          Completed Tasks
        </h2>

        {/* Priority Filter */}
        <div className="flex gap-2.5 items-center">
          <p className="font-medium">Priority</p>
          <PriorityDropdown
            selected={priorityFilter || "All"}
            onSelect={handleFilter}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="h-[842px] mb-[50px] rounded-[30px] border shadow-[0_4px_0_0_black] overflow-hidden bg-white">
        {/* Table Header */}
        <div className="flex justify-between border-b font-bold bg-[#FBFBFB]">
          <p className="py-4 pl-8 w-[400px]">Name</p>
          <p className="py-4 pl-7 w-[150px]">Priority</p>
          <p className="py-4 w-[200px]">Date</p>
          <p className="py-4 w-[180px]">Status</p>
          <p className="py-4 pr-8 w-[180px]">More Action</p>
        </div>

        {/* Task Rows */}
        <div className="h-[700px] overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading completed tasks...</p>
            </div>
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={task._id}
                className={`flex h-[70px] items-center border-b hover:bg-gray-50 ${
                  index % 2 === 1 ? "bg-[#F8FBFF]" : ""
                }`}
              >
                {/* Name */}
                <p className="text-[18px] font-semibold px-8 w-[400px]">
                  {task.title}
                </p>

                {/* Priority */}
                <div className="px-8 w-[150px]">
                  <p
                    className={`inline-block px-6 py-1 w-[86px] text-center rounded-[20px] text-sm font-medium ${getPriorityClass(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </p>
                </div>

                {/* Date */}
                <p className="text-[18px] px-8 w-[200px] font-medium">
                  {new Date(task.createdAt).toLocaleDateString("en-GB")}
                </p>

                {/* Status */}
                <div className="px-8 w-[180px]">
                  <div className="flex items-center gap-3">
                    <div className="w-32 border border-gray-300 rounded-full h-2.5">
                      <div
                        className="bg-[#77C2FF] h-2.5 rounded-full"
                        style={{ width: `${task.status || 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{task.status || 100}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex  gap-6 pl-16 w-[180px]">
                  <IoEye
                    onClick={() => setSelectedTask(task)}
                    className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
                  />
                  <img
                    src={del}
                    alt="delete"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      /* Add delete logic if needed */
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">No completed tasks found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-between px-8 py-4 items-center border-t">
            <p className="text-sm">
              Page {page} of {totalPages || 1}
            </p>

            <div className="flex items-center gap-4">
              <MdOutlineKeyboardArrowLeft
                onClick={() => hasPrevPage && setCurrentPage((p) => p - 1)}
                className={`w-8 h-8 cursor-pointer ${
                  !hasPrevPage ? "opacity-40 cursor-not-allowed" : ""
                }`}
              />

              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                (num) => (
                  <p
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`cursor-pointer px-4 py-1 rounded-lg transition ${
                      num === page
                        ? "bg-black text-white font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </p>
                ),
              )}

              <MdOutlineKeyboardArrowRight
                onClick={() => hasNextPage && setCurrentPage((p) => p + 1)}
                className={`w-8 h-8 cursor-pointer ${
                  !hasNextPage ? "opacity-40 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {selectedTask && (
        <ViewModal
          task={{
            name: selectedTask.title,
            priority: selectedTask.priority,
            date: new Date(selectedTask.createdAt).toLocaleDateString(),
            status: "Completed",
          }}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default CompletedPage;
