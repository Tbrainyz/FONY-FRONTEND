import React, { useContext, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLockOpen } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../assets/FB_IMG_16265830618836469 1.png";

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: null,
  });

  const [preview, setPreview] = useState(user?.profilePicture || ProfileImage);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: null,
    });
    setPreview(user?.profilePicture || ProfileImage);
    setIsEditing(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-10 w-full max-w-2xl"
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
          {isEditing && (
            <label className="flex items-center gap-2 text-black cursor-pointer text-sm font-semibold hover:text-blue-600 transition">
              <RiCameraAiLine size={20} />
              Change Profile Image
              <input type="file" hidden onChange={handleImage} />
            </label>
          )}
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
              disabled={!isEditing}
              className={`bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none ${
                isEditing ? "focus:ring-2 focus:ring-blue-400" : "opacity-60"
              }`}
            />
          </div>

          {/* EMAIL (always disabled) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="bg-gray-100 border border-gray-200 p-4 rounded-2xl opacity-60"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none ${
                isEditing ? "focus:ring-2 focus:ring-blue-400" : "opacity-60"
              }`}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-bold shadow-[0_4px_0px_rgba(0,0,0,1)]"
            >
              Edit Profile Information
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-black py-4 rounded-2xl font-bold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* CHANGE PASSWORD */}
          <button
            type="button"
            onClick={() => navigate("/change-password")}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-blue-500 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            <MdOutlineLockOpen /> Change Password
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-red-500 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            <AiOutlineLogout /> Log out
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
