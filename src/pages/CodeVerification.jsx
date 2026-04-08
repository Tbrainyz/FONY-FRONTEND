import React, { useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/Frame-2.svg";
import { toast } from "react-toastify";

const CodeVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, resendOtp } = useContext(AuthContext);

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputsRef = useRef([]);

  if (!email) {
    return <div className="text-center py-20">No email found. Go back and try again.</div>;
  }

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("").trim();
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await verifyOtp(email, code);
      toast.success("OTP verified successfully!");
      navigate("/createpassword", { state: { email, otp: code } });
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired OTP";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await resendOtp(email);
      toast.success("New OTP sent!");
      setOtp(Array(6).fill(""));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-x-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div
            onClick={() => navigate("/forgot-password")}
            className="flex gap-2 items-center cursor-pointer mb-8 text-gray-700 hover:text-gray-900"
          >
            <img src={arrow} alt="Back" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Enter 6-Digit Code
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Enter the code sent to <span className="font-medium break-all">{email}</span>
          </p>

          {/* OTP Inputs - Made smaller and tighter on mobile */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 
                           text-2xl text-center 
                           border-2 border-gray-300 bg-white 
                           rounded-2xl focus:border-[#77C2FF] 
                           focus:outline-none transition-all"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center mb-6 text-sm">{error}</p>}

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl 
                       border-2 border-black shadow-[0_4px_0_0_black] 
                       active:translate-y-0.5 disabled:opacity-70 transition-all"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          {/* Resend Link */}
          <p className="text-center mt-8 text-sm text-gray-600">
            Didn't receive the code?{" "}
            <span
              onClick={handleResend}
              className="text-[#77C2FF] cursor-pointer font-medium hover:underline"
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </span>
          </p>
        </div>
      </div>

      {/* Right Side Image - Hidden on small screens */}
      <div className="hidden lg:block lg:flex-1 bg-gray-100">
        <img 
          src={img} 
          alt="Illustration" 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default CodeVerification;