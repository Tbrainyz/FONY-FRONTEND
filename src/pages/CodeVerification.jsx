import React, { useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/Arrow.svg";
import img from "../assets/Frame-2.svg";
import { toast } from "react-toastify";

const CodeVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendOtp } = useContext(AuthContext);
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

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

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    navigate("/createpassword", { state: { email, otp: code } });
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await resendOtp(email);
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            onClick={() => navigate("/")}
            className="flex gap-2 items-center cursor-pointer mb-10"
          >
            <img src={arrow} alt="" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">Enter 6-Digit Code</h2>
          <p className="text-gray-600 mb-8">
            Enter the 6-digit code sent to <span className="font-medium">{email}</span>
          </p>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-2xl border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5"
          >
            Continue
          </button>

          <p className="text-center mt-8 text-sm">
            Didn't receive the code?{" "}
            <span
              onClick={handleResend}
              className="text-blue-600 cursor-pointer font-medium"
            >
              {loading ? "Resending..." : "Resend"}
            </span>
          </p>

          <p className="text-center mt-4 text-sm">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:flex-1 bg-gray-100">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CodeVerification;