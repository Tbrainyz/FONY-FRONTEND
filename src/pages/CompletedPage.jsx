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
    if (prio === "high") return "border border-red-500 text-red-500 bg-red-50";
    if (prio === "medium") return "border border-orange-500 text-orange-500 bg-orange-50";
    if (prio === "low") return "border border-blue-500 text-blue-500 bg-blue-50";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-[Caveat] font-extrabold">
            Completed Tasks
          </h2>
          <div className="flex gap-3 items-center">
            <p className="font-medium">Priority</p>
            <PriorityDropdown selected={priorityFilter || "All"} onSelect={handleFilter} />
          </div>
        </div>

        <div className="bg-white border rounded-3xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="flex bg-[#FBFBFB] font-bold border-b">
                <p className="py-5 pl-8 w-[40%]">Name</p>
                <p className="py-5 pl-8 w-[15%]">Priority</p>
                <p className="py-5 w-[18%]">Date</p>
                <p className="py-5 w-[15%]">Status</p>
                <p className="py-5 pr-8 w-[12%]">More Action</p>
              </div>

              <div className="min-h-[600px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full py-20">
                    <p className="text-gray-500">Loading completed tasks...</p>
                  </div>
                ) : tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <div
                      key={task._id}
                      className={`flex items-center border-b h-[70px] hover:bg-gray-50 ${index % 2 === 1 ? "bg-[#F8FBFF]" : ""}`}
                    >
                      <p className="text-[18px] font-semibold px-8 w-[40%]">{task.title}</p>
                      <div className="px-8 w-[15%]">
                        <p className={`inline-block px-6 py-1 text-sm font-medium rounded-2xl ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </p>
                      </div>
                      <p className="text-[18px] px-8 w-[18%] font-medium">
                        {new Date(task.createdAt).toLocaleDateString("en-GB")}
                      </p>
                      <div className="px-8 w-[15%]">
                        <div className="flex items-center gap-3">
                          <div className="w-28 bg-gray-200 h-2.5 rounded-full">
                            <div className="bg-[#77C2FF] h-2.5 rounded-full" style={{ width: "100%" }} />
                          </div>
                          <span className="font-medium">100%</span>
                        </div>
                      </div>
                      <div className="flex gap-6 w-[12%] pl-8">
                        <IoEye
                          onClick={() => setSelectedTask(task)}
                          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
                        />
                        <img
                          src={del}
                          alt="delete"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full py-20">
                    <p className="text-gray-500 text-lg">No completed tasks found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

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