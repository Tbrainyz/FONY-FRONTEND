
import React, { useContext } from "react";
import trash from "../assets/Del.svg";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TaskContext } from "../context/TasksContext";

const DeleteModal = ({ task, closeModal }) => {
  const { deleteTask } = useContext(TaskContext);

  const handleDelete = async () => {
    try {
      if (task?._id) {
        await deleteTask(task._id);
        closeModal();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-md rounded-3xl border border-b-8 border-black p-8">
        <div className="flex justify-between items-center mb-6">
          <img src={trash} alt="delete" className="w-12" />
          <MdCancel 
            className="text-3xl cursor-pointer text-gray-500 hover:text-black" 
            onClick={closeModal} 
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">Are you sure?</h1>
        <p className="text-gray-600 mb-8">This action cannot be undone. The task will be permanently deleted.</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDelete}
            className="w-full bg-[#FF3B3B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition"
          >
            <RiDeleteBinLine size={22} />
            Yes, Delete Task
          </button>

          <button
            onClick={closeModal}
            className="w-full border border-gray-300 py-4 rounded-2xl font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;