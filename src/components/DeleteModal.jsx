import React from "react";
import trash from "../assets/Del.svg";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteModal = ({ title, message, onConfirm, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-md rounded-3xl border border-b-8 border-black p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <img src={trash} alt="delete" className="w-12" />
          <MdCancel
            className="text-3xl cursor-pointer text-gray-500 hover:text-black"
            onClick={closeModal}
          />
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-[#FF3B3B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition"
          >
            <RiDeleteBinLine size={22} />
            Yes, Delete
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
