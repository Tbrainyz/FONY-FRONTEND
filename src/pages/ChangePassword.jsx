import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/run.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { updatePassword } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(oldPassword, newPassword);
      toast.success("Password updated successfully!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-950 transition-colors">
      
      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Back Button */}
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 cursor-pointer mb-10 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <img src={arrow} alt="back" className="w-5 dark:invert" />
            <p className="font-medium">Back</p>
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Change Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Update your password by filling the form below
          </p>

          {/* FORM */}
          <div className="space-y-6">

            {/* OLD PASSWORD */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Current Password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full h-14 px-5 pr-12 border border-gray-300 dark:border-gray-600 rounded-3xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:outline-none focus:border-[#77C2FF] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 
                             text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                >
                  {showOld ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                New Password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-14 px-5 pr-12 border border-gray-300 dark:border-gray-600 rounded-3xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:outline-none focus:border-[#77C2FF] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 
                             text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                >
                  {showNew ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full h-14 px-5 pr-12 border border-gray-300 dark:border-gray-600 rounded-3xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:outline-none focus:border-[#77C2FF] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 
                             text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                >
                  {showConfirm ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] hover:bg-blue-500 text-white font-bold rounded-3xl 
                         border-2 border-black dark:border-white 
                         shadow-[0_4px_0_0_black] dark:shadow-[0_4px_0_0_white] 
                         active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <img
          src={img}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
};

export default ChangePassword;
