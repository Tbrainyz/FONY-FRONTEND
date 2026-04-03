import React, { useContext, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { TaskContext } from "../context/TasksContext";

const UpdateModal = ({ task, closeModal, openNextModal }) => {
  const { updateTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        status: task.status || 0,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (priority) => setFormData({ ...formData, priority });
  const handleStatus = (value) => setFormData({ ...formData, status: value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateTask(task._id, formData);
      closeModal();
      if (openNextModal) openNextModal();
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-lg md:max-w-xl rounded-3xl border border-b-8 border-black overflow-hidden">
        <div className="flex justify-between items-start px-8 pt-8 pb-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Update Task</h1>
            <p className="text-gray-600 mt-1">Update your task details</p>
          </div>
          <MdCancel 
            className="text-3xl cursor-pointer text-gray-500 hover:text-black" 
            onClick={closeModal} 
          />
        </div>

        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1">Task Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 px-5 rounded-2xl border focus:border-[#77C2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-12 px-5 rounded-2xl border focus:border-[#77C2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <div className="grid grid-cols-3 gap-3">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => handlePriority(level)}
                  className={`h-12 rounded-2xl border capitalize font-medium transition-all ${
                    formData.priority === level 
                      ? "bg-black text-white border-black" 
                      : "hover:border-gray-400"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Progress</label>
            <div className="flex flex-wrap gap-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => handleStatus(val)}
                  className={`px-6 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
                    formData.status === val 
                      ? "bg-black text-white border-black" 
                      : "bg-white hover:border-gray-400"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t bg-white">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-[#77C2FF] rounded-2xl font-bold border border-b-4 border-black disabled:opacity-70 active:translate-y-0.5 transition-all"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;