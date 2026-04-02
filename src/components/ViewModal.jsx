import React from "react";
import { MdCancel } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";

const ViewModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-125 mt-20">
        
        {/* HEADER */}
        <div className="flex justify-between text-center">
          <h1 className="text-[30px] font-bold font-[Caveat] mb-6">
            Task Details
          </h1>
          <MdCancel
            onClick={onClose}
            className="text-[#FF3B3B] w-6 h-6 cursor-pointer"
          />
        </div>

        {/* BODY */}
        <div className="border p-6 rounded-xl space-y-3 text-left font-[Montserrat]">
          
          <p>
            <strong>Name:</strong> {task.title || "Untitled Task"}
          </p>

          <div className="flex items-center gap-2">
            <p className="font-bold">Priority:</p>
            <span
              className={`px-3 py-1 rounded-[20px] text-center font-medium
                ${task.priority === "High" ? "border border-red-500 text-red-500" : ""}
                ${task.priority === "Medium" ? "border border-orange-500 bg-orange-100 text-orange-500" : ""}
                ${task.priority === "Low" ? "border border-blue-500 bg-blue-100 text-blue-500" : ""}
              `}
            >
              {task.priority}
            </span>
          </div>

          <p>
            <strong>Date:</strong>{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "--"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status === 100 ? "Completed" : `${task.status || 0}%`}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex gap-2 items-center justify-center mt-4">
          <TiInputChecked className="text-green-600 w-6 h-6" />
          <p className="text-green-600 font-semibold">
            Task completed successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;