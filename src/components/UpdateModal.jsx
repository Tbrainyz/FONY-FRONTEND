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

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        status: task.status || 0,
      });

      setPreviewUrl(task.image || null);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = {
        ...formData,
        image: imageFile,
      };

      await updateTask(task._id, data);

      closeModal();

      openNextModal({
        message: "Task Updated Successfully",
      });

    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-lg md:max-w-xl rounded-3xl border border-b-8 border-black overflow-hidden">
        
        {/* Header SAME AS CREATE */}
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

        {/* ✅ SCROLLABLE BODY (IMPORTANT) */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* Title */}
          <div>
            <label className="text-sm font-medium">Task Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF] focus:outline-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">Priority</label>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setFormData({ ...formData, priority: level })
                  }
                  className={`h-12 rounded-2xl border capitalize font-medium ${
                    formData.priority === level
                      ? "bg-black text-white border-black"
                      : ""
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Progress</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  onClick={() =>
                    setFormData({ ...formData, status: val })
                  }
                  className={`px-5 py-2 rounded-2xl border ${
                    formData.status === val
                      ? "bg-black text-white border-black"
                      : ""
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Update Image</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-2"
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                className="mt-3 w-32 rounded-xl"
              />
            )}
          </div>
        </div>

        {/* Footer SAME AS CREATE */}
        <div className="p-8 border-t bg-white">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-[#77C2FF] rounded-2xl font-bold border border-b-4 border-black"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;