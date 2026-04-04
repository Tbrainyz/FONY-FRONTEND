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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = {
        ...formData,
        image: imageFile, // ✅ include image
      };

      await updateTask(task._id, data);

      closeModal();

      openNextModal({
        title: "Task Updated Successfully",
        message: "Your task has been updated successfully.",
      });

    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-lg rounded-3xl border border-b-8 border-black overflow-hidden">

        {/* Header */}
        <div className="flex justify-between px-8 pt-8 pb-6 border-b">
          <h1 className="text-2xl font-bold">Update Task</h1>
          <MdCancel className="text-3xl cursor-pointer" onClick={closeModal} />
        </div>

        <div className="p-8 space-y-6">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border"
          />

          {/* Priority */}
          <div className="flex gap-3">
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                onClick={() => setFormData({ ...formData, priority: p })}
                className={`px-4 py-2 rounded-xl border ${
                  formData.priority === p ? "bg-black text-white" : ""
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex gap-2">
            {[0, 25, 50, 75, 100].map((s) => (
              <button
                key={s}
                onClick={() => setFormData({ ...formData, status: s })}
                className={`px-3 py-1 rounded ${
                  formData.status === s ? "bg-black text-white" : "border"
                }`}
              >
                {s}%
              </button>
            ))}
          </div>

          {/* Image Upload */}
          <input type="file" onChange={handleImage} />

          {previewUrl && (
            <img src={previewUrl} className="w-32 rounded-xl" />
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#77C2FF] py-3 rounded-xl border border-b-4 border-black"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;