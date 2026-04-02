import React, { useState, useRef, useContext } from "react";
import img from "../assets/Frame-2.svg";
import arrow from "../assets/Arrow.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CodeVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendOtp } = useContext(AuthContext);

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // refs for each input
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next input if value entered
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
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
      alert("OTP resent successfully!");
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="gap-8 flex flex-col w-1/2 px-[7%] pt-30">
        <div onClick={() => navigate("/")} className="flex gap-2 items-center cursor-pointer">
          <img src={arrow} alt="" className="w-4" />
          <p className="font-medium font-[Mona_Sans]">Back</p>
        </div>

        <div>
          <p className="text-[38px] font-bold">Enter 6-Digit Code</p>
          <p className="font-[Montserrat]">Enter the 6-digit code sent to {email}.</p>
        </div>

        <div className="flex items-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-15 h-15 rounded-[50px] bg-white border-3 border-gray-300 text-center text-xl"
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-[#77C2FF] p-2 border-b-5 rounded-4xl font-[Montserrat] font-bold cursor-pointer"
        >
          Continue
        </button>

        <p className="mt-4 font-[Montserrat]">
          Didn't receive the code?{" "}
          <span onClick={handleResend} className="text-blue-500 cursor-pointer">
            {loading ? "Resending..." : "Resend"}
          </span>
        </p>
        <p className="font-[Montserrat]">
          Remember your password?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer">
            Sign In
          </span>
        </p>
      </div>

      <div className="w-[54.5%]">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default CodeVerification;
