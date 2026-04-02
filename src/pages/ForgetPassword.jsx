import React, { useState, useContext } from "react";
import img from "../assets/run.svg";
import arrow from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      // ✅ If successful, navigate to code verification page
      navigate("/codeverification", { state: { email } });
    } catch (err) {
      setError(err.message || "Failed to send reset instructions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen font-[Montserrat]">
      <div className="gap-8 flex flex-col w-1/2 px-[7%] pt-30">
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
          <img src={arrow} alt="" className="w-4" />
          <p className="font-medium font-[Mona_Sans]">Back</p>
        </div>

        <div>
          <p className="text-[38px] font-bold">Forgot your password?</p>
          <p className="font-[Mona_Sans]">
            We will send instructions to your email to reset your password.
          </p>
        </div>

        <div className="flex flex-col gap-4 font-semibold">
          <p>Email</p>
          <input
            className="border rounded-4xl p-4"
            type="email"
            placeholder="Enter email used to create account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#77C2FF] p-2 border-b-5 rounded-4xl cursor-pointer font-[Montserrat] font-bold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>
      </div>

      <div className="w-[54.5%]">
        <img src={img} alt="" className="object-cover" />
      </div>
    </div>
  );
};

export default ForgetPassword;
