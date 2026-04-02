import React, { useContext, useState, useEffect } from "react";
import pic from "../assets/Vector.svg";
import { MdCancel } from "react-icons/md";
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

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle priority selection
  const handlePriority = (level) => {
    setFormData({ ...formData, priority: level });
  };

  // Handle image with preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Submit form
  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.priority) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        image: imageFile, // ✅ backend uploads to Cloudinary
      };

      await createTask(data);

      closeModal();
      if (openNextModal) openNextModal();

      // Reset form
      setFormData({ title: "", description: "", priority: "" });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[#FBFBFB] rounded-3xl border border-b-8 border-black overflow-hidden"
        style={{ width: "700px", height: "550px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-8 pt-6 pb-4 border-b">
          <div>
            <h1 className="font-[Rackety-DEMO] text-[28px] font-bold text-black">
              Create New Task
            </h1>
            <p className="text-[15px] text-[#666666] font-medium mt-1">
              Enter description about this task
            </p>
          </div>
          <MdCancel
            className="text-3xl cursor-pointer text-gray-600 hover:text-black"
            onClick={closeModal}
          />
        </div>

        {/* Form Content */}
        <div
          className="create-task-modal px-8 py-6 space-y-6 overflow-auto"
          style={{ height: "420px" }}
        >
          {/* Task Name */}
          <div>
            <p className="text-sm font-medium text-[#666666] mb-1">
              Task Name <span className="text-[#A4003A]">*</span>
            </p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your task name"
              className="w-full h-12 px-5 rounded-2xl border border-gray-300 focus:outline-none focus:border-[#77C2FF]"
            />
          </div>

          {/* Task Description */}
          <div>
            <p className="text-sm font-medium text-[#666666] mb-1">
              Task Description <span className="text-[#A4003A]">*</span>
            </p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What is this task about?"
              className="w-full h-12 px-5 rounded-2xl border border-gray-300 focus:outline-none focus:border-[#77C2FF]"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <p className="text-sm font-medium text-[#666666] mb-2">
              Select Task Priority <span className="text-[#A4003A]">*</span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handlePriority(level)}
                  className={`h-12 rounded-2xl border text-sm font-medium capitalize transition-all ${
                    formData.priority === level
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload with Preview */}
          <div>
            <p className="text-sm font-medium text-[#666666] mb-2">
              Upload Image (Optional)
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#77C2FF] transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {previewUrl ? (
                  <div className="text-center">
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="mx-auto max-h-40 rounded-xl object-cover shadow-sm"
                    />
                    <p className="text-green-600 text-sm mt-3 font-medium">
                      Image selected — Click to change
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <img src={pic} alt="upload" className="mx-auto mb-3 w-12" />
                    <p className="text-sm text-gray-600">
                      Drag & Drop your Image or <br />
                      <span className="text-[#0C0C0C] font-medium">
                        Browse file
                      </span>
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className=" bottom-0 left-0 right-0 px-8 py-5 border-t bg-[#FBFBFB]">
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.title ||
                !formData.description ||
                !formData.priority
              }
              className="w-full h-12 bg-[#77C2FF] text-white font-bold rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#66b3f0] transition"
            >
              {loading ? "Creating Task..." : "Create New Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
