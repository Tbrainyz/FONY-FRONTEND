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
      console.error("Verify OTP Error:", err.response?.data); // ← Helpful for debugging
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
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            onClick={() => navigate("/forgot-password")}
            className="flex gap-2 items-center cursor-pointer mb-10 text-gray-700 hover:text-gray-900"
          >
            <img src={arrow} alt="" className="w-5" />
            <p className="font-medium">Back</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">Enter 6-Digit Code</h2>
          <p className="text-gray-600 mb-8">
            Enter the code sent to <span className="font-medium">{email}</span>
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
                className="w-12 h-14 text-center text-2xl border-2 border-gray-300 bg-white rounded-2xl focus:border-[#77C2FF] focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5 disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          <p className="text-center mt-8 text-sm text-gray-600">
            Didn't receive the code?{" "}
            <span
              onClick={handleResend}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </span>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1 bg-gray-100">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CodeVerification;