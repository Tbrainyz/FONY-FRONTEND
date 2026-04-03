import React, { useContext } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ tasks = [], setSelectedTask, openUpdateModal, openDeleteModal }) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getPriorityClass = (priority) => {
    const p = priority?.toLowerCase();
    if (p === "high") return "bg-red-50 border border-red-500 text-red-600";
    if (p === "medium") return "bg-orange-50 border border-orange-500 text-orange-600";
    if (p === "low") return "bg-blue-50 border border-blue-500 text-blue-600";
    return "bg-gray-50 border border-gray-400 text-gray-600";
  };

  // Color for progress bar based on status
  const getProgressColor = (status) => {
    if (status >= 80) return "bg-green-500";
    if (status >= 50) return "bg-[#77C2FF]";
    if (status >= 25) return "bg-blue-400";
    return "bg-gray-400";
  };

  return (
    <div className="divide-y">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={task._id}
            className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 px-4 md:px-6 py-5 hover:bg-gray-50 
              ${index % 2 === 1 ? "bg-[#F8FBFF]" : "bg-white"}`}
          >
            {/* Task Name */}
            <div className="w-full lg:w-[38%]">
              <p className="font-semibold text-[17px] leading-tight">{task.title}</p>
            </div>

            {/* Priority */}
            <div className="w-full lg:w-[15%] mt-3 lg:mt-0">
              <span
                className={`inline-block px-5 py-1.5 rounded-2xl text-sm font-medium border ${getPriorityClass(
                  task.priority
                )}`}
              >
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "—"}
              </span>
            </div>

            {/* Date */}
            <div className="w-full lg:w-[18%] text-sm text-gray-700 mt-3 lg:mt-0">
              {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
            </div>

            {/* Status Progress Bar */}
            <div className="w-full lg:w-[18%] mt-3 lg:mt-0">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                    style={{ width: `${task.status || 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium whitespace-nowrap min-w-[50px] text-right">
                  {task.status || 0}%
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-6 lg:ml-auto pt-4 lg:pt-0">
              <img
                src={pen}
                alt="edit"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  setSelectedTask(task);
                  openUpdateModal();
                }}
              />
              <img
                src={del}
                alt="delete"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  setSelectedTask(task);
                  openDeleteModal();
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center text-gray-500">No tasks available</div>
      )}
    </div>
  );
};

export default TaskRow;