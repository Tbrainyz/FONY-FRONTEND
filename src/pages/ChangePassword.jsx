import React, { useState, useContext } from "react";
import img from "../assets/run.svg";
import arrow from "../assets/Arrow.svg";
import eye from "../assets/eye.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { updatePassword } = useContext(AuthContext); // you’ll add this in AuthContext

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(oldPassword, newPassword); // backend route: /users/change-password
      alert("Password updated successfully!");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen font-[Montserrat]">
      <div className="gap-8 flex flex-col w-1/2 px-[7%] pt-20">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src={arrow} alt="" className="w-4" />
          <p className="font-medium font-[Mona_Sans]">Back</p>
        </div>

        <div>
          <p className="text-[38px] font-bold">Change Password</p>
          <p className="font-[Mona_Sans]">
            Update your password by filling the form below
          </p>
        </div>

        <div className="flex flex-col gap-4 font-semibold">
          <p>
            Current Password <span className="text-red-600">*</span>
          </p>
          <div className="border rounded-4xl flex justify-between relative">
            <input
              className="border rounded-4xl p-3 w-full"
              type={showOld ? "text" : "password"}
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <img
              className="cursor-pointer absolute right-3 top-3"
              src={eye}
              alt="toggle"
              onClick={() => setShowOld(!showOld)}
            />
          </div>

          <p>
            New Password <span className="text-red-600">*</span>
          </p>
          <div className="border rounded-4xl flex justify-between relative">
            <input
              className="border rounded-4xl p-3 w-full"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <img
              className="cursor-pointer absolute right-3 top-3"
              src={eye}
              alt="toggle"
              onClick={() => setShowNew(!showNew)}
            />
          </div>

          <p>
            Confirm New Password <span className="text-red-600">*</span>
          </p>
          <div className="border rounded-4xl flex justify-between relative">
            <input
              className="border rounded-4xl p-3 w-full"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              className="cursor-pointer absolute right-3 top-3"
              src={eye}
              alt="toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#77C2FF] p-3 border-b-5 rounded-4xl font-[Montserrat] font-bold cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>

      <div className="w-[54.5%]">
        <img src={img} alt="" className="object-cover" />
      </div>
    </div>
  );
};

export default ChangePassword;
