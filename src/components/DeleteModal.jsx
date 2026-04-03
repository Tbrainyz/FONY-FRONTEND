import React, { useContext } from "react";
import trash from "../assets/Del.svg";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TaskContext } from "../context/TasksContext";

const DeleteModal = ({ task, user, closeModal, onConfirm }) => {
  const { deleteTask } = useContext(TaskContext);

  const handleDelete = async () => {
    try {
      // ✅ For USERS
      if (onConfirm) {
        await onConfirm();
        closeModal();
        return;
      }

      // ✅ For TASKS (fallback)
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
    <div className="w-182 h-90.75 rounded-[30px] border bg-[#FBFBFB] flex flex-col mx-auto mt-20 px-10 py-5">
      
      <div className="flex justify-between mb-5">
        <img src={trash} alt="" />
        <MdCancel
          className="text-gray-500 w-6 h-6 cursor-pointer"
          onClick={closeModal}
        />
      </div>

      <h1 className="text-left font-bold font-[Caveat] text-[30px] text-[#000000] mb-1.75">
        Are you sure you want to delete {user ? "this user" : "this task"}?
      </h1>

      <p className="text-left text-[16px] text-[#666666] font-medium mb-8.75">
        This {user ? "user" : "task"} will be permanently removed.
      </p>

      <button
        onClick={handleDelete}
        className="px-9.5 bg-[#FF3B3B] h-14 rounded-[48px] flex items-center justify-center gap-2.5 mb-3 shadow-[0_4px_6px_rgba(0,0,0,1)]"
      >
        <RiDeleteBinLine className="text-white" />
        <p className="text-white font-[Montserrat] font-bold text-[16px]">
          Delete {user ? "User" : "Task"}
        </p>
      </button>

      <button
        onClick={closeModal}
        className="px-9.5 border border-[#D9D9D9] h-14 rounded-[48px] text-center text-[#666666] font-medium font-[Mona_Sans]"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteModal;