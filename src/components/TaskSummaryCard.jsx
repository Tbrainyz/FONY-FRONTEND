import React, { useContext } from "react";
import pic from "../assets/list.svg";
import { TaskContext } from "../context/TasksContext";

const TaskSummaryCard = () => {
  const { totalTasks, completedCount, ongoingCount, loading } = useContext(TaskContext);

  const summaries = [
    { 
      label: "Total Task", 
      value: totalTasks, 
      color: "text-black dark:text-white",
      bgColor: "bg-white dark:bg-gray-900"
    },
    { 
      label: "Ongoing Task", 
      value: ongoingCount, 
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-white dark:bg-gray-900"
    },
    { 
      label: "Completed Task", 
      value: completedCount, 
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-white dark:bg-gray-900"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {summaries.map((item, i) => (
        <div
          key={i}
          className={`border border-b-4 border-black dark:border-white 
                     rounded-3xl p-6 flex gap-5 shadow-sm 
                     ${item.bgColor} transition-all`}
        >
          <img 
            src={pic} 
            alt="" 
            className="w-12 h-12 dark:brightness-110" 
          />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {item.label}
            </p>
            <p className={`text-3xl font-bold mt-1 ${item.color}`}>
              {loading ? "..." : item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummaryCard;