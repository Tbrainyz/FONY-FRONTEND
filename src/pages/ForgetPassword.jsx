// pages/ForgetPassword.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/run.svg";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("OTP sent to your email");
      navigate("/codeverification", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            className="flex gap-2 items-center cursor-pointer mb-10"
            onClick={() => navigate(-1)}
          >
            <img src={arrow} alt="back" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">Forgot your password?</h2>
          <p className="text-gray-600 mb-8">
            We will send a 6-digit code to your email to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                className="w-full h-14 px-5 border rounded-3xl focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5 disabled:opacity-70"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1 bg-gray-100">
        <img src={img} alt="Illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ForgetPassword;