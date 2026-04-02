import React, { useContext } from "react";
import pic from "../assets/list.svg";
import { TaskContext } from "../context/TasksContext";

const TaskSummaryCard = () => {
  const { totalTasks, completedCount, ongoingCount, loading } =
    useContext(TaskContext);

  const taskSummary = [
    {
      label: "Total Task",
      value: totalTasks,
      color: "text-black",
    },
    {
      label: "Ongoing Task",
      value: ongoingCount, // status < 100
      color: "text-orange-600",
    },
    {
      label: "Completed Task",
      value: completedCount, // status === 100
      color: "text-green-600",
    },
  ];

  return (
    <div className="flex gap-[33px]">
      {taskSummary.map((summary, index) => (
        <div
          key={index}
          className="w-[391px] h-[111px] border-[1px] shadow-[0_4px_0_0_black] rounded-[22px] px-[22px] py-[35px] flex gap-[5px] bg-white"
        >
          <img src={pic} alt="" className="w-[40px] h-[40px] rounded-[12px]" />

          <div className="leading-[20px] h-[50px]">
            <p className="text-gray-600 text-[15px] font-medium">
              {summary.label}
            </p>

            <p className={`font-bold text-[28px] mt-1 ${summary.color}`}>
              {loading ? "..." : summary.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummaryCard;
