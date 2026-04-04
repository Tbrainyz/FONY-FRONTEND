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

  // ✅ LOAD TASK DATA
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        status: task.status || 0,
      });

      setPreviewUrl(task.image || null); // existing image
    }
  }, [task]);

  // ✅ CLEANUP
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

  const handlePriority = (priority) =>
    setFormData({ ...formData, priority });

  const handleStatus = (value) =>
    setFormData({ ...formData, status: value });

  // ✅ IMAGE FIX
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // preview works
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = {
        ...formData,
        image: imageFile, // send image
      };

      await updateTask(task._id, data);

      closeModal();

      if (openNextModal) {
        openNextModal("Task updated successfully");
      }

    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-lg md:max-w-xl rounded-3xl border border-b-8 border-black overflow-hidden">

        {/* HEADER */}
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

        {/* SCROLLABLE CONTENT */}
        <div className="scrollable-content p-8 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Task Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF]"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 h-12 px-5 rounded-2xl border focus:border-[#77C2FF]"
            />
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm font-medium">Priority</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => handlePriority(level)}
                  className={`h-12 rounded-2xl border ${
                    formData.priority === level
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm w-full font-medium">Progress</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => handleStatus(val)}
                  className={`px-4 py-2 w-[20%] rounded-2xl border ${
                    formData.status === val
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-medium">Update Image</label>
            <div className="border-2 border-dashed rounded-2xl p-6 mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="update-image"
              />

              <label htmlFor="update-image" className="cursor-pointer block text-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="mx-auto max-h-40 rounded-xl"
                  />
                ) : (
                  <img src={pic} className="mx-auto w-12" />
                )}
              </label>
            </div>
          </div>
           {/* FOOTER */}
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
    </div>
  );
};

export default UpdateModal;