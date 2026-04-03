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
    loading,
    hasPrevPage,
    priorityFilter,
    setPriorityFilter,
  } = useContext(TaskContext);

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTasks(currentPage, priorityFilter || "", 100);
  }, [currentPage, priorityFilter, fetchTasks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priorityFilter]);

  const handleFilter = (value) => {
    setPriorityFilter(value === "All" ? "" : value);
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-50 border border-red-500 text-red-600";
    if (prio === "medium") return "bg-orange-50 border border-orange-500 text-orange-600";
    if (prio === "low") return "bg-blue-50 border border-blue-500 text-blue-600";
    return "";
  };

  // Progress bar color based on status
  const getProgressColor = (status = 100) => {
    if (status === 100) return "bg-green-500";
    if (status >= 75) return "bg-[#77C2FF]";
    if (status >= 50) return "bg-blue-500";
    if (status >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-[Caveat] font-extrabold">
            Completed Tasks
          </h2>
          <div className="flex gap-3 items-center">
            <p className="font-medium">Priority</p>
            <PriorityDropdown
              selected={priorityFilter || "All"}
              onSelect={handleFilter}
            />
          </div>
        </div>

        <div className="bg-white border rounded-3xl shadow overflow-hidden">
          
          {/* Desktop Table Header - Hidden on Mobile */}
          <div className="hidden lg:flex bg-[#FBFBFB] font-bold border-b text-base">
            <p className="flex-1 py-5 pl-8">Task Name</p>
            <p className="w-32 py-5 pl-8">Priority</p>
            <p className="w-44 py-5">Date</p>
            <p className="w-44 py-5">Status</p>
            <p className="w-32 py-5 pr-8">Actions</p>
          </div>

          {/* Mobile: Card View | Desktop: Table Rows */}
          <div className="min-h-[600px]">
            {loading ? (
              <div className="flex items-center justify-center h-full py-20">
                <p className="text-gray-500">Loading completed tasks...</p>
              </div>
            ) : tasks.length > 0 ? (
              <>
                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <p className="font-semibold text-lg flex-1 pr-4">{task.title}</p>
                        <span
                          className={`inline-block px-4 py-1 text-sm font-medium rounded-2xl border ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm mb-4 text-gray-600">
                        <p>
                          {new Date(task.createdAt).toLocaleDateString("en-GB")}
                        </p>
                        <p className="font-medium">{task.status || 100}%</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-5">
                        <div
                          className={`h-3 rounded-full transition-all ${getProgressColor(task.status)}`}
                          style={{ width: `${task.status || 100}%` }}
                        />
                      </div>

                      <div className="flex gap-6">
                        <IoEye
                          onClick={() => setSelectedTask(task)}
                          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
                        />
                        <img
                          src={del}
                          alt="delete"
                          className="w-6 h-6 cursor-pointer hover:scale-110"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table Rows */}
                <div className="hidden lg:block">
                  {tasks.map((task, index) => (
                    <div
                      key={task._id}
                      className={`flex items-center border-b hover:bg-gray-50 py-5 px-6 ${
                        index % 2 === 1 ? "bg-[#F8FBFF]" : ""
                      }`}
                    >
                      <p className="flex-1 font-semibold text-[17px]">{task.title}</p>

                      <div className="w-32">
                        <span
                          className={`inline-block px-5 py-1.5 rounded-2xl text-sm font-medium border ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority || "—"}
                        </span>
                      </div>

                      <p className="w-44 text-gray-700">
                        {new Date(task.createdAt).toLocaleDateString("en-GB")}
                      </p>

                      <div className="w-44">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                              style={{ width: `${task.status || 100}%` }}
                            />
                          </div>
                          <span className="font-medium text-sm whitespace-nowrap">
                            {task.status || 100}%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-6 w-32">
                        <IoEye
                          onClick={() => setSelectedTask(task)}
                          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
                        />
                        <img
                          src={del}
                          alt="delete"
                          className="w-6 h-6 cursor-pointer hover:scale-110"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full py-20">
                <p className="text-gray-500 text-lg">No completed tasks found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8 py-5 border-t">
            <p className="text-sm">Page {page} of {totalPages || 1}</p>
            <div className="flex items-center gap-4">
              <MdOutlineKeyboardArrowLeft
                onClick={() => hasPrevPage && setCurrentPage((p) => p - 1)}
                className={`w-8 h-8 cursor-pointer ${!hasPrevPage ? "opacity-40" : ""}`}
              />
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((num) => (
                <p
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`cursor-pointer px-4 py-2 rounded-lg ${num === page ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  {num}
                </p>
              ))}
              <MdOutlineKeyboardArrowRight
                onClick={() => hasNextPage && setCurrentPage((p) => p + 1)}
                className={`w-8 h-8 cursor-pointer ${!hasNextPage ? "opacity-40" : ""}`}
              />
            </div>
          </div>
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
    </div>
  );
};

export default CompletedPage;