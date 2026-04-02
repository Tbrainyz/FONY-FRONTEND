import React, { useContext, useState, useEffect } from "react";
import pic from "../assets/Vector.svg";
import { MdCancel } from "react-icons/md";
import { TaskContext } from "../context/TasksContext";

const UpdateModal = ({ closeModal, openNextModal, task }) => {
  const { updateTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: 0,
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Pre-fill form when task is selected
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        status: task.status || 0,
        image: null,
      });
    }
  }, [task]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PRIORITY SELECT
  const handlePriority = (priority) => {
    setFormData({ ...formData, priority });
  };

  // STATUS SELECT
  const handleStatus = (value) => {
    setFormData({ ...formData, status: value });
  };

  // SUBMIT UPDATE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateTask(task._id, formData);

      closeModal();
      if (openNextModal) openNextModal();
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inset-0 bg-black/40 flex mt-[-90px] h-[800px] items-center justify-center">
      <div className=" bg-[#FBFBFB] w-170 h-135 mt-22.5 pl-6 pr-8 py-5 ml-97.25 mr-120.75 rounded-3xl border border-b-6 border-black">
        <div className="flex justify-between">
          <div className="">
            <h1 className="font-[Rackety-DEMO] text-[#000000] text-[25px] font-bold">
              Update your Task
            </h1>
            <p className="text-4 font-[Montserrat] text-[#666666] font-medium">
              Update your task to keep you on the go.
            </p>
          </div>

          <div className="cursor-pointer" onClick={closeModal}>
            <MdCancel />
          </div>
        </div>

        <div className="font-[Montserrat]">
          <form>
            {/* TITLE */}
            <div className="mt-4">
              <p className="text-4 font-medium text-[#0C0C0C] ">
                Task Name <span className="text-[#A4003A]">*</span>
              </p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-7 text-[#000000] bg-[#FFFFFF] rounded-4xl py-4.75 px-4.5 border border-gray-300 mt-1.5 text-[16px] font-semibold"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <p className="text-4 font-medium text-[#0C0C0C] ">
                Task Description <span className="text-[#A4003A]">*</span>
              </p>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-7 text-[#000000] bg-[#FFFFFF] rounded-4xl py-4.75 px-4.5 border border-gray-300 mt-1.5 text-[16px] font-semibold"
              />
            </div>
          </form>

          {/* PRIORITY */}
          <div className="mt-4">
            <p className="text-4 font-medium text-[#0C0C0C] ">
              Select Task Priority <span className="text-[#A4003A]">*</span>
            </p>

            <div className="grid grid-cols-3 mt-3">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handlePriority(level)}
                  className={`w-50 h-7 flex items-center justify-center rounded-4xl py-4.75 px-4.5 border mt-1.5 ${
                    formData.priority === level
                      ? "bg-black text-white"
                      : "bg-[#FFFFFF] text-[#666666] border-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div className="mt-1.5">
            <p className="text-4 font-medium text-[#666666] ">
              Select Task Progress <span className="text-[#A4003A]">*</span>
            </p>

            <div className="mt-4 flex items-center">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleStatus(val)}
                  className={`w-43.5 h-7 rounded-3xl ml-1 text-[16px] font-medium border ${
                    formData.status === val
                      ? "bg-black text-white"
                      : "bg-[#FFFFFF] text-[#000000] border-[#D9D9D9]"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full h-14 rounded-4xl py-3 px-4.75 bg-[#77C2FF] border-2 border-b-6 border-[#000000] text-[16px] font-bold text-[#000000]"
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;