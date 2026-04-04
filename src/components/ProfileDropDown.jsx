import React from "react";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import profileImage from "../assets/FB_IMG_16265830618836469 1.png";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({ setOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    setOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 w-72 md:w-80">
      <div className="flex items-center gap-4 pb-5 border-b border-gray-200 dark:border-gray-700">
        <img
          src={user?.profilePicture || profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        <div>
          <p className="font-bold text-lg text-gray-900 dark:text-white">{user?.name || "User"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <button
          onClick={() => { navigate("/profile"); setOpen(false); }}
          className="flex items-center gap-4 w-full p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
        >
          <HiOutlineUser className="text-2xl" />
          <span className="font-medium">View Profile</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400 transition"
        >
          <HiOutlineLogout className="text-2xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropDown;