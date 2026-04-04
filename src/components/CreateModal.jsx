import React, { useContext, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import pic from "../assets/Vector.svg";
import { TaskContext } from "../context/TasksContext";

const CreateModal = ({ closeModal, openNextModal }) => {
  const { createTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (level) => {
    setFormData({ ...formData, priority: level });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.priority) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = { ...formData, image: imageFile };
      await createTask(data);
      closeModal();
      if (openNextModal) openNextModal();
    } catch (error) {
      alert("Failed to create task");
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Task</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enter description about this task
            </p>
          </div>

          <MdCancel
            className="text-3xl cursor-pointer text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            onClick={closeModal}
          />
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Task Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#77C2FF] focus:outline-none"
              placeholder="Enter your task name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Task Description <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#77C2FF] focus:outline-none"
              placeholder="What is this task about?"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Task Priority <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3 mt-3">
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

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Image (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 mt-2 hover:border-[#77C2FF] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="mx-auto max-h-48 rounded-xl" />
                ) : (
                  <div>
                    <img src={pic} alt="upload" className="mx-auto w-14 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload image
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description || !formData.priority}
            className="w-full h-12 bg-[#77C2FF] rounded-2xl font-bold border border-b-4 border-black dark:border-white disabled:bg-gray-400 disabled:cursor-not-allowed active:translate-y-0.5 transition-all text-black"
          >
            {loading ? "Creating..." : "Create New Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;