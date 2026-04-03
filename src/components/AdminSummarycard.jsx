import React from "react";
import { FaUsers, FaTasks, FaCheckCircle, FaSpinner } from "react-icons/fa";

const AdminSummaryCard = ({ stats }) => {
  if (!stats) return null;

  const summaryItems = [
    { label: "Total Users", value: stats.usersCount || 0, color: "bg-blue-100 border-blue-500 text-blue-700", icon: <FaUsers /> },
    { label: "Total Tasks", value: stats.tasksCount || 0, color: "bg-purple-100 border-purple-500 text-purple-700", icon: <FaTasks /> },
    { label: "Completed Tasks", value: stats.completedCount || 0, color: "bg-green-100 border-green-500 text-green-700", icon: <FaCheckCircle /> },
    { label: "Ongoing Tasks", value: stats.ongoingCount || 0, color: "bg-yellow-100 border-yellow-500 text-yellow-700", icon: <FaSpinner /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {summaryItems.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 p-5 md:p-6 rounded-2xl shadow border-l-4 ${item.color}`}
        >
          <div className="text-3xl md:text-4xl flex-shrink-0">{item.icon}</div>
          <div>
            <p className="text-sm font-medium text-gray-600">{item.label}</p>
            <p className="text-2xl md:text-3xl font-bold mt-1">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSummaryCard;