import React, { useContext } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ tasks = [], setSelectedTask, openUpdateModal, openDeleteModal }) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getPriorityClass = (priority) => {
    const p = priority?.toLowerCase();
    if (p === "high") return "bg-red-50 border-red-500 text-red-600";
    if (p === "medium") return "bg-orange-50 border-orange-500 text-orange-600";
    if (p === "low") return "bg-blue-50 border-blue-500 text-blue-600";
    return "";
  };

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={task._id}
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 px-6 py-5 border-b hover:bg-gray-50 ${index % 2 === 1 ? "bg-[#F6FBFF]" : ""}`}
          >
            <div className="w-full md:w-[403px]">
              <p className="font-semibold text-lg">{task.title}</p>
            </div>

            <div className="w-full md:w-[146px]">
              <span className={`inline-block px-5 py-1 rounded-2xl text-sm font-medium border ${getPriorityClass(task.priority)}`}>
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "—"}
              </span>
            </div>

            <div className="w-full md:w-[236px] text-sm md:text-base">
              {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
            </div>

            <div className="w-full md:w-[236px]">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-[#77C2FF] h-2.5 rounded-full"
                    style={{ width: `${task.status || 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {task.status || 0}% ({getStatusLabel(task.status)})
                </span>
              </div>
            </div>

            <div className="flex gap-6 md:ml-auto pt-4 md:pt-0">
              <img
                src={pen}
                alt="edit"
                className="w-6 h-6 cursor-pointer hover:scale-110"
                onClick={() => { setSelectedTask(task); openUpdateModal(); }}
              />
              <img
                src={del}
                alt="delete"
                className="w-6 h-6 cursor-pointer hover:scale-110"
                onClick={() => { setSelectedTask(task); openDeleteModal(); }}
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