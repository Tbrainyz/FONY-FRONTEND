import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-[400px] bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Profile</h2>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          <img
            src={
              user?.profilePicture ||
              "https://via.placeholder.com/100"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* USER INFO */}
        <div className="space-y-2 text-center">
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;