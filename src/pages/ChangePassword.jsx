import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/run.svg";
import eye from "../assets/eye.svg";
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

    useEffect(() => {
      if (!user) {
        navigate("/login", { replace: true });
      }
    }, [user]);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col lg:flex-row transition-colors">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            className="flex gap-2 items-center cursor-pointer mb-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={() => navigate(-1)}
          >
            <img src={arrow} alt="" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Change Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Update your password by filling the form below
          </p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Current Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-3xl pr-12 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <img
                  src={eye}
                  alt="toggle"
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 cursor-pointer"
                  onClick={() => setShowOld(!showOld)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-3xl pr-12 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <img
                  src={eye}
                  alt="toggle"
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-3xl pr-12 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img
                  src={eye}
                  alt="toggle"
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] hover:bg-blue-500 text-white font-bold rounded-3xl 
                         border-2 border-black dark:border-white shadow-[0_4px_0_0_black] 
                         dark:shadow-[0_4px_0_0_white] active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:flex-1 bg-gray-100 dark:bg-gray-900">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ChangePassword;