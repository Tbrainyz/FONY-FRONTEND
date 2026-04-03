import React from "react";
import { MdCancel } from "react-icons/md";

const ViewModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Task Details</h1>
          <MdCancel onClick={onClose} className="text-3xl cursor-pointer text-red-500" />
        </div>

        <div className="space-y-4 text-sm">
          <p><strong>Name:</strong> {task.title}</p>
          <p>
            <strong>Priority:</strong>{" "}
            <span className={`px-4 py-1 rounded-full text-xs font-medium ${task.priority === "high" ? "bg-red-100 text-red-600" : task.priority === "medium" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
              {task.priority}
            </span>
          </p>
          <p><strong>Date:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "—"}</p>
          <p><strong>Status:</strong> {task.status === 100 ? "Completed" : `${task.status}%`}</p>
        </div>

        <div className="mt-8 flex justify-center gap-2 text-green-600">
          <span>✓</span>
          <p className="font-medium">Task completed successfully</p>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;