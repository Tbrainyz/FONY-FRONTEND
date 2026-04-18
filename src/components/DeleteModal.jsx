import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TasksContext } from "../context/TasksContext";

const DeleteModal = ({ task, user, closeModal, onConfirm }) => {
  const { deleteTask } = useContext(TasksContext);

  const handleDelete = async () => {
    try {
      if (onConfirm) {
        await onConfirm();
        closeModal();
        return;
      }

      if (task?._id) {
        await deleteTask(task._id);
        closeModal();
      }
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-[999] p-4">
      <div className="w-full max-w-[460px] bg-white dark:bg-gray-900 rounded-[30px] border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
        
        {/* Header with Icon */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
            <RiDeleteBinLine className="text-4xl text-red-600 dark:text-red-400" />
          </div>
          
          <MdCancel
            className="text-gray-500 dark:text-gray-400 w-7 h-7 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            onClick={closeModal}
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <h1 className="font-bold font-[Caveat] text-[30px] text-gray-900 dark:text-white mb-3 leading-tight">
            Are you sure you want to delete {user ? "this user" : "this task"}?
          </h1>

          <p className="text-[16px] text-gray-600 dark:text-gray-400 font-medium mb-10">
            This {user ? "user" : "task"} will be permanently removed and cannot be recovered.
          </p>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="w-full h-14 bg-[#FF3B3B] hover:bg-red-600 active:bg-red-700 
                       text-white font-[Montserrat] font-bold text-[16px] rounded-[48px] 
                       flex items-center justify-center gap-3 mb-4 shadow-[0_4px_6px_rgba(255,59,59,0.3)] 
                       transition-all active:translate-y-0.5"
          >
            <RiDeleteBinLine className="text-xl" />
            Delete {user ? "User" : "Task"}
          </button>

          {/* Cancel Button */}
          <button
            onClick={closeModal}
            className="w-full h-14 border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 font-medium font-[Mona_Sans] 
                       rounded-[48px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;