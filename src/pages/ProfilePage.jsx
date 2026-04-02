import React, { useContext, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLockOpen } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import ProfileImage from "../assets/FB_IMG_16265830618836469 1.png";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: null,
  });

  const [preview, setPreview] = useState(
    user?.profilePicture || ProfileImage
  );

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // preview
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
// LOGOUT
   const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className=" w-full flex justify-center items-center bg-gray-50 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-10  w-full max-w-2xl "
      >
        <h2 className="text-3xl font-bold text-center text-black mb-2">
          Personal Information
        </h2>

        {/* IMAGE */}
        <div className="flex items-center justify-between w-full mb-4">
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-100 object-cover"
          />

          <label className="flex items-center gap-2 text-black cursor-pointer text-sm font-semibold hover:text-blue-600 transition">
            <RiCameraAiLine size={20} />
            Change Profile Image
            <input
              type="file"
              hidden
              onChange={handleImage}
            />
          </label>
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4">

          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">
          
          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-bold shadow-[0_4px_0px_rgba(0,0,0,1)]"
          >
            Edit Profile information
          </button>

          {/* FORGOT PASSWORD */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-blue-500 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            <MdOutlineLockOpen /> Forgot Password
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-red-500 py-4 rounded-2xl font-semibold hover:bg-black-50 transition"
          >
            <AiOutlineLogout /> Log out
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;