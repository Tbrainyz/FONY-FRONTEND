import React, { useContext, useState, useEffect } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLockOpen } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../assets/FB_IMG_16265830618836469 1.png";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useContext(AuthContext); // ← Use logout from context if available
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [preview, setPreview] = useState(ProfileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load user data properly when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        image: null,
      });
      setPreview(user.profilePicture || ProfileImage);
    }
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
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        image: null,
      });
      setPreview(user.profilePicture || ProfileImage);
    }
    setIsEditing(false);
  };

  // Fixed Logout Function
  const handleLogout = () => {
    if (logout) {
      // If you have logout function in AuthContext, use it (Recommended)
      logout();
    } else {
      // Fallback: Manual logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: Clear any other stored data
      // localStorage.clear();
    }
    
    navigate("/login", { replace: true }); // replace prevents going back
  };

  // Show loading or redirect if no user
  if (!user) {
    return <div className="text-center py-10">Please log in to view profile</div>;
  }

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 min-h-screen py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-8 md:p-10 w-full max-w-2xl rounded-3xl shadow-sm"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-2">
          Personal Information
        </h2>

        {/* Profile Image */}
        <div className="flex items-center justify-between w-full mb-6">
          <img
            src={preview}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-100 object-cover"
          />
          {isEditing && (
            <label className="flex items-center gap-2 text-black cursor-pointer text-sm font-semibold hover:text-blue-600 transition">
              <RiCameraAiLine size={22} />
              Change Profile Image
              <input 
                type="file" 
                hidden 
                accept="image/*"
                onChange={handleImage} 
              />
            </label>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none transition ${
                isEditing ? "focus:ring-2 focus:ring-blue-400" : "opacity-60"
              }`}
            />
          </div>

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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none transition ${
                isEditing ? "focus:ring-2 focus:ring-blue-400" : "opacity-60"
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-bold shadow-[0_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition"
            >
              Edit Profile Information
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-70 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-black py-4 rounded-2xl font-bold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/change-password")}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-blue-600 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            <MdOutlineLockOpen size={20} />
            Change Password
          </button>

          {/* Fixed Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white border border-red-400 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-50 transition"
          >
            <AiOutlineLogout size={20} />
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;