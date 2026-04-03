import React, { useContext } from "react";
import pic from "../assets/list.svg";
import { TaskContext } from "../context/TasksContext";

const TaskSummaryCard = () => {
  const { totalTasks, completedCount, ongoingCount, loading } = useContext(TaskContext);

  const summaries = [
    { label: "Total Task", value: totalTasks, color: "text-black" },
    { label: "Ongoing Task", value: ongoingCount, color: "text-orange-600" },
    { label: "Completed Task", value: completedCount, color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {summaries.map((item, i) => (
        <div
          key={i}
          className="bg-white border border-b-4 border-black rounded-3xl p-6 flex gap-5 shadow-sm"
        >
          <img src={pic} alt="" className="w-12 h-12" />
          <div>
            <p className="text-gray-600 text-sm">{item.label}</p>
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