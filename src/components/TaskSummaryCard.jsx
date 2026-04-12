import React, { useContext } from "react";
import pic from "../assets/list.svg";
import { TaskContext } from "../context/TasksContext";

const TaskSummaryCard = () => {
  const { totalTasks, completedCount, ongoingCount, loading } = useContext(TaskContext);

  const summaries = [
    {
      label: "Total Tasks",
      value: totalTasks,
      accent: "from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-800",
    },
    {
      label: "Ongoing",
      value: ongoingCount,
      accent: "from-orange-300 to-orange-500",
    },
    {
      label: "Completed",
      value: completedCount,
      accent: "from-green-300 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {summaries.map((item, i) => (
        <div
          key={i}
          className="relative rounded-3xl p-6 overflow-hidden 
          bg-white/70 dark:bg-gray-900/70 backdrop-blur-md 
          border border-gray-200 dark:border-gray-700
          shadow hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          {/* Accent Glow */}
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.accent}`}
          />

          <div className="relative flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow">
              <img src={pic} alt="" className="w-8 h-8 dark:invert" />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? "..." : item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummaryCard;
