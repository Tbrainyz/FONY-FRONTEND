import React, { useContext } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({
  tasks = [],
  setSelectedTask,
  openUpdateModal,
  openDeleteModal,
}) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") {
      return "border border-red-500 text-red-600 bg-red-50";
    }
    if (prio === "medium") {
      return "border border-orange-500 text-orange-600 bg-orange-50";
    }
    if (prio === "low") {
      return "border border-blue-500 text-blue-600 bg-blue-50";
    }
    return "";
  };

  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={task._id || index}
            className={`flex h-[70px] items-center border-b hover:bg-gray-50 ${
              index % 2 === 1 ? "bg-[#F6FBFF]" : ""
            }`}
          >
            {/* Name */}
            <p className="text-[18px] font-semibold px-8 w-[403px]">
              {task.title || "Untitled Task"}
            </p>

            {/* Priority */}
            <div className="px-8 w-[146px]">
              <p
                className={`inline-block w-[86px] text-center py-1 rounded-[20px] text-sm font-medium ${getPriorityClass(
                  task.priority
                )}`}
              >
                {task.priority
                  ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
                  : "—"}
              </p>
            </div>

            {/* Date */}
            <p className="text-[18px] px-8 w-[236px] font-medium">
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString("en-GB")
                : "—"}
            </p>

            {/* Status */}
            <div className="px-8 w-[236px]">
              <div className="flex items-center gap-3">
                <div className="w-[134px] h-[26px] border border-gray-300 rounded-[170px] overflow-hidden">
                  <div
                    className="bg-[#77C2FF] h-[24px] rounded-[170px]"
                    style={{ width: `${task.status || 0}%` }}
                  />
                </div>
                <p className="font-medium text-sm">
                  {task.status || 0}% ({getStatusLabel(task.status)})
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-6 px-8 w-[237px]">
              <img
                onClick={() => {
                  setSelectedTask(task);
                  openUpdateModal();
                }}
                src={pen}
                alt="edit"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              />

              <img
                onClick={() => {
                  setSelectedTask(task);
                  openDeleteModal();
                }}
                src={del}
                alt="delete"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-gray-500 text-lg">No tasks available</p>
        </div>
      )}
    </>
  );
};

export default TaskRow;
