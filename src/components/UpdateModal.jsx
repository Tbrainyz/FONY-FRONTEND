import React, { useContext, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import pic from "../assets/Vector.svg";
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

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (priority) => setFormData({ ...formData, priority });
  const handleStatus = (value) => setFormData({ ...formData, status: value });

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
      const data = { ...formData, image: imageFile };
      await updateTask(task._id, data);
      closeModal();
      if (openNextModal) openNextModal();
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg md:max-w-xl rounded-3xl border border-b-8 border-black dark:border-white overflow-hidden shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-start px-8 pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Update Task</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Update your task details</p>
          </div>
          <MdCancel
            className="text-3xl cursor-pointer text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            onClick={closeModal}
          />
        </div>

        {/* BODY */}
        <div className=" scrollable-content  p-8  space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#77C2FF]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 whitespace-pre-wrap break-words break-all rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#77C2FF]"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => handlePriority(level)}
                  className={`h-12 rounded-2xl border font-medium capitalize transition-all ${
                    formData.priority === level
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => handleStatus(val)}
                  className={`px-4 py-2 flex-1 rounded-2xl border text-sm font-medium transition-all ${
                    formData.status === val
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Image</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 mt-2 hover:border-[#77C2FF]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="update-image"
              />
              <label htmlFor="update-image" className="cursor-pointer block text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="mx-auto max-h-40 rounded-xl" />
                ) : (
                  <img src={pic} className="mx-auto w-12" />
                )}
              </label>
            </div>
          </div>
              {/* FOOTER */}
        <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#77C2FF] to-blue-500 text-white font-semibold"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </div>
        </div>

    
      </div>
    </div>
  );
};

export default UpdateModal;