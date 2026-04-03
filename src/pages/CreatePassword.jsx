import React, { useState, useContext } from "react";
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

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (!email || !otp) {
      setError("Missing email or OTP. Please start the reset process again.");
      toast.error("Missing email or OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting password reset with:", { email, otp }); // For debugging

      await resetPassword(email, otp, newPassword);

      toast.success("Password reset successful! Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err);

      const serverMessage = err.response?.data?.message || "Failed to reset password";

      if (serverMessage.toLowerCase().includes("otp") || 
          serverMessage.toLowerCase().includes("invalid") || 
          serverMessage.toLowerCase().includes("expired")) {
        setError("Invalid or expired OTP. Please request a new OTP.");
      } else {
        setError(serverMessage);
      }

      toast.error(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            className="flex gap-2 items-center cursor-pointer mb-10"
            onClick={() => navigate(-1)}
          >
            <img src={arrow} alt="back" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">Create your password</h2>
          <p className="text-gray-600 mb-8">
            Create a new password by filling the form below
          </p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Create New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 focus:outline-none focus:border-[#77C2FF]"
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

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 focus:outline-none focus:border-[#77C2FF]"
                  placeholder="Re-enter password"
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
              className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-100 items-center justify-center">
        <img src={img} alt="Illustration" className="max-h-[85%] object-contain" />
      </div>
    </div>
  );
};

export default CreatePassword;