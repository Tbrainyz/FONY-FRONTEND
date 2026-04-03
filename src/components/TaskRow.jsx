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
    if (status <= 75) return "bg-[#77C2FF]";
    return "bg-green-500";
  };

  return (
    <div>
      {/* MOBILE */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="bg-white border rounded-3xl p-6 shadow-sm">
              {/* ...task info... */}
              <div className="flex gap-6">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">No tasks available</div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={task._id} className="flex items-center px-8 py-5 border-b">
              {/* ...task info... */}
              <div className="w-24 flex justify-end gap-5">
                <img
                  src={pen}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => { setSelectedTask(task); openUpdateModal(); }}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => { setSelectedTask(task); openDeleteModal(); }}
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
