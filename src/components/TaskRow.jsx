import React, { useContext } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ tasks = [], setSelectedTask, openUpdateModal, openDeleteModal }) => {
  const { getStatusLabel } = useContext(TaskContext);

  // Progress bar color based on percentage
  const getProgressColor = (status = 0) => {
    if (status === 0) return "bg-red-500";
    if (status <= 25) return "bg-yellow-500";
    if (status <= 50) return "bg-blue-500";
    if (status <= 75) return "bg-[#77C2FF]";
    return "bg-green-500"; // 76-100%
  };

  return (
    <div>
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="font-semibold text-lg leading-tight flex-1">{task.title}</p>
                <span
                  className={`inline-block px-4 py-1 text-xs font-medium rounded-2xl border ${
                    task.priority?.toLowerCase() === "high"
                      ? "bg-red-50 border-red-500 text-red-600"
                      : task.priority?.toLowerCase() === "medium"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "bg-blue-50 border-blue-500 text-blue-600"
                  }`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <p className="text-gray-600">
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
                </p>
                <p className="font-medium">{task.status || 0}%</p>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-5">
                <div
                  className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                  style={{ width: `${task.status || 0}%` }}
                />
              </div>

              <div className="flex gap-4">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110"
                  onClick={() => {
                    setSelectedTask(task);
                    openUpdateModal();
                  }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110"
                  onClick={() => {
                    setSelectedTask(task);
                    openDeleteModal();
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">No tasks available</div>
        )}
      </div>

      {/* Desktop & Tablet View - Table Row */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center gap-6 px-6 py-5 border-b hover:bg-gray-50 ${
                index % 2 === 1 ? "bg-[#F8FBFF]" : "bg-white"
              }`}
            >
              <div className="flex-1 font-semibold text-[17px]">{task.title}</div>

              <div className="w-28">
                <span
                  className={`inline-block px-5 py-1.5 rounded-2xl text-sm font-medium border ${
                    task.priority?.toLowerCase() === "high"
                      ? "bg-red-50 border-red-500 text-red-600"
                      : task.priority?.toLowerCase() === "medium"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "bg-blue-50 border-blue-500 text-blue-600"
                  }`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="w-40 text-gray-700">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
              </div>

              <div className="w-40">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                      style={{ width: `${task.status || 0}%` }}
                    />
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap">
                    {task.status || 0}%
                  </span>
                </div>
              </div>

              <div className="flex gap-5">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => {
                    setSelectedTask(task);
                    openUpdateModal();
                  }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
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
    </div>
  );
};

export default TaskRow;