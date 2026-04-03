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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] rounded-3xl border border-b-8 border-black w-full max-w-lg md:max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start px-6 pt-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Create New Task</h1>
            <p className="text-gray-600 mt-1">Enter description about this task</p>
          </div>
          <MdCancel className="text-3xl cursor-pointer" onClick={closeModal} />
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Task Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF]"
              placeholder="Enter your task name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Task Description <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF]"
              placeholder="What is this task about?"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">Select Task Priority <span className="text-red-600">*</span></label>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => handlePriority(level)}
                  className={`h-12 rounded-2xl border capitalize font-medium transition ${
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

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Upload Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 mt-2 hover:border-[#77C2FF]">
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer block text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="mx-auto max-h-40 rounded-xl" />
                ) : (
                  <div>
                    <img src={pic} alt="upload" className="mx-auto w-12 mb-3" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-6 border-t bg-white">
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description || !formData.priority}
            className="w-full h-12 bg-[#77C2FF] text-black font-bold rounded-2xl disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create New Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;