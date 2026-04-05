import React from "react";
import { FaUsers, FaTasks, FaCheckCircle, FaSpinner } from "react-icons/fa";

const AdminSummaryCard = ({ stats }) => {
  if (!stats) return null;

  const summaryItems = [
    { 
      label: "Total Users", 
      value: stats.usersCount || 0, 
      icon: <FaUsers />,
      color: "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-300" 
    },
    { 
      label: "Total Tasks", 
      value: stats.tasksCount || 0, 
      icon: <FaTasks />,
      color: "bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-950 dark:border-purple-600 dark:text-purple-300" 
    },
    { 
      label: "Completed Tasks", 
      value: stats.completedCount || 0, 
      icon: <FaCheckCircle />,
      color: "bg-green-100 border-green-500 text-green-700 dark:bg-green-950 dark:border-green-600 dark:text-green-300" 
    },
    { 
      label: "Ongoing Tasks", 
      value: stats.ongoingCount || 0, 
      icon: <FaSpinner />,
      color: "bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-600 dark:text-yellow-300" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {summaryItems.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 p-5 md:p-6 rounded-2xl shadow border-l-4 
                     ${item.color}`}
        >
          <div className="text-3xl md:text-4xl flex-shrink-0">
            {item.icon}
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {item.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSummaryCard;