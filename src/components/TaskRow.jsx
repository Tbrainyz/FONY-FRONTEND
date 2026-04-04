import React, { useContext } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";

const TaskRow = ({ tasks = [], setSelectedTask, openUpdateModal, openDeleteModal }) => {
  const { getStatusLabel } = useContext(TaskContext);

  const getProgressColor = (status = 0) => {
    if (status === 0) return "bg-red-500";
    if (status <= 25) return "bg-yellow-500";
    if (status <= 50) return "bg-blue-500";
    if (status <= 75) return "bg-[#77C2FF] dark:bg-blue-400";
    return "bg-green-500";
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";
    const prio = priority.toLowerCase();
    if (prio === "high") return "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400";
    if (prio === "medium") return "bg-orange-100 dark:bg-orange-900/30 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400";
    if (prio === "low") return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400";
    return "";
  };

  return (
    <div>
      {/* MOBILE: CARD VIEW */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="font-semibold text-lg leading-tight pr-4 text-gray-900 dark:text-white">
                  {task.title}
                </p>
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-2xl border ${getPriorityClass(task.priority)}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}</p>
                <p className="font-medium">{task.status || 0}%</p>
              </div>

              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
                <div
                  className={`h-3 rounded-full transition-all ${getProgressColor(task.status)}`}
                  style={{ width: `${task.status || 0}%` }}
                />
              </div>

              <div className="flex gap-6">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition dark:brightness-110"
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition dark:brightness-110"
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">No tasks available</div>
        )}
      </div>

      {/* DESKTOP: TABLE ROW */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center px-8 py-5 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                index % 2 === 1 ? "bg-[#F8FBFF] dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"
              }`}
            >
              <div className="w-[30%] pr-6">
                <p className="font-semibold text-[17px] text-gray-900 dark:text-white">{task.title}</p>
              </div>

              <div className="w-[15%] text-center">
                <span
                  className={`inline-block px-6 py-1.5 rounded-2xl text-sm font-medium border ${getPriorityClass(task.priority)}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              <div className="w-[20%] text-center text-gray-700 dark:text-gray-300">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("en-GB") : "—"}
              </div>

              <div className="w-[20%]">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all ${getProgressColor(task.status)}`}
                      style={{ width: `${task.status || 0}%` }}
                    />
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap min-w-[45px] text-right text-gray-700 dark:text-gray-300">
                    {task.status || 0}%
                  </span>
                </div>
              </div>

              <div className="w-[15%] flex justify-end gap-5">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition dark:brightness-110"
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition dark:brightness-110"
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">No tasks available</div>
        )}
      </div>
    </div>
  );
};

export default TaskRow;