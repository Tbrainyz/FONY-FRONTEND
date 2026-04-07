// pages/CreatePassword.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/run.svg";
import eye from "../assets/eye.svg";
import { toast } from "react-toastify";

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useContext(AuthContext);

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Protect this page - redirect if no email or OTP
  useEffect(() => {
    if (!email || !otp) {
      toast.error("Session expired. Please start the reset process again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  const handleSubmit = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      
      toast.success("Password reset successful! You can now login.");

      // Clear sensitive data from location state
      navigate("/login", { 
        replace: true,
        state: { message: "Password reset successful" } 
      });
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Failed to reset password";
      setError(serverMessage);
      toast.error(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            className="flex gap-2 items-center cursor-pointer mb-10 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => navigate("/forgot-password", { replace: true })}
          >
            <img src={arrow} alt="back" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Create New Password
          </h2>
          <p className="text-gray-600 mb-8">
            Enter a strong new password for your account
          </p>

          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 
                             bg-white text-gray-900 
                             focus:outline-none focus:border-[#77C2FF]"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <img
                  src={eye}
                  alt="toggle"
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 
                             bg-white text-gray-900 
                             focus:outline-none focus:border-[#77C2FF]"
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] hover:bg-blue-500 text-white font-bold rounded-3xl 
                         border-2 border-black shadow-[0_4px_0_0_black] 
                         active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-100 items-center justify-center">
        <img 
          src={img} 
          alt="Illustration" 
          className="max-h-[85%] object-contain" 
        />
      </div>
    </div>
  );
};

export default CreatePassword;