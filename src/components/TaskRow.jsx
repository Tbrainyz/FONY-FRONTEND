import React, { useContext, useState } from "react";
import pen from "../assets/Pen.svg";
import del from "../assets/Del.svg";
import { TaskContext } from "../context/TasksContext";
import DeleteModal from "./DeleteModal"; // ✅ import

const TaskRow = ({ tasks = [], setSelectedTask, openUpdateModal }) => {
  const { deleteTask } = useContext(TaskContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setLocalSelectedTask] = useState(null);

  const getProgressColor = (status = 0) => {
    if (status === 0) return "bg-red-500";
    if (status <= 25) return "bg-yellow-500";
    if (status <= 50) return "bg-blue-500";
    if (status <= 75) return "bg-[#77C2FF]";
    return "bg-green-500";
  };

  const handleDeleteTask = async () => {
    try {
      if (selectedTask?._id) {
        await deleteTask(selectedTask._id);
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* ==================== MOBILE: CARD VIEW ==================== */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow transition-all"
            >
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
                  onClick={() => { setLocalSelectedTask(task); setShowDeleteModal(true); }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">No tasks available</div>
        )}
      </div>

      {/* ==================== DESKTOP: TABLE ROW ==================== */}
      <div className="hidden lg:block">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className={`flex items-center px-8 py-5 border-b hover:bg-gray-50 ${
                index % 2 === 1 ? "bg-[#F8FBFF]" : "bg-white"
              }`}
            >
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
                  onClick={() => { setLocalSelectedTask(task); setShowDeleteModal(true); }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">No tasks available</div>
        )}
      </div>

      {/* ✅ Delete Modal */}
      {showDeleteModal && selectedTask && (
        <DeleteModal
          title="Are you sure?"
          message="This action cannot be undone. The task will be permanently deleted."
          onConfirm={handleDeleteTask}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default TaskRow;
