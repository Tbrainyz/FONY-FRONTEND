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

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("Reset instructions sent to your email");
      navigate("/codeverification", { state: { email } });
    } catch (err) {
      toast.error(err.message || "Failed to send reset instructions");
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
            <img src={arrow} alt="back" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Forgot your password?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We will send instructions to your email to reset your password.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-3xl 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:outline-none focus:border-blue-500"
                placeholder="Enter email used to create account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] hover:bg-blue-500 text-white font-bold rounded-3xl 
                         border-2 border-black dark:border-white shadow-[0_4px_0_0_black] 
                         dark:shadow-[0_4px_0_0_white] active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Sending..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:flex-1 bg-gray-100 dark:bg-gray-900">
        <img src={img} alt="Illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ForgetPassword;