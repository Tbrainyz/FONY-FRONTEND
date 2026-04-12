import React, { useState, useContext, useEffect } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLockOpen } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../assets/FB_IMG_16265830618836469 1.png";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [preview, setPreview] = useState(DefaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        image: null,
      });
      setPreview(user.profilePicture || DefaultProfile);
    }
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user]);

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
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success("Profile updated ✨");
      setIsEditing(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreview(user.profilePicture || DefaultProfile);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <form
          onSubmit={handleSubmit}
          className="relative p-10 rounded-3xl overflow-hidden
          bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl
          border border-white/20 dark:border-gray-800
          shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        >

          {/* Glow Effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400/20 blur-3xl rounded-full"></div>

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Your Profile
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Manage your personal information
            </p>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />

              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center 
                bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
                  <RiCameraAiLine size={28} className="text-white" />
                  <input type="file" hidden accept="image/*" onChange={handleImage} />
                </label>
              )}
            </div>

            <p className="mt-4 font-semibold text-gray-800 dark:text-gray-200">
              {user.name}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-2 h-12 px-4 rounded-xl border 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-[#77C2FF] outline-none
                disabled:opacity-60 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full mt-2 h-12 px-4 rounded-xl 
                bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-2 h-12 px-4 rounded-xl border 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-[#77C2FF] outline-none
                disabled:opacity-60"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 space-y-4">

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full h-12 rounded-xl font-semibold
                bg-gradient-to-r from-[#77C2FF] to-blue-500 text-white
                hover:scale-[1.02] active:scale-[0.98] transition"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-[#77C2FF] to-blue-500
                  hover:scale-[1.02] transition disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 h-12 rounded-xl font-semibold
                  bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                  hover:scale-[1.02] transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl
              border border-gray-300 dark:border-gray-700
              text-blue-600 dark:text-blue-400
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <MdOutlineLockOpen size={20} />
              Change Password
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl
              border border-red-400 dark:border-red-600
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-950 transition"
            >
              <AiOutlineLogout size={20} />
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
