import React, { useState, useContext, useEffect } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLockOpen } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../assets/FB_IMG_16265830618836469 1.png";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login", { replace: true });
  };

  if (!user) {
    return <div className="text-center py-20">Please log in to view profile</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow">
          <h2 className="text-3xl font-bold text-center mb-8">Personal Information</h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
            />
            {isEditing && (
              <label className="mt-4 flex items-center gap-2 text-blue-600 cursor-pointer text-sm font-semibold">
                <RiCameraAiLine size={24} />
                Change Profile Image
                <input type="file" hidden accept="image/*" onChange={handleImage} />
              </label>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-14 px-5 border rounded-2xl bg-gray-50 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full h-14 px-5 border rounded-2xl bg-gray-100 opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-14 px-5 border rounded-2xl bg-gray-50 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 space-y-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-4 border-2 border-black rounded-2xl font-bold shadow-[0_4px_0_0_black] active:translate-y-0.5 active:shadow-none"
              >
                Edit Profile Information
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-gray-200 rounded-2xl font-bold"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="w-full flex items-center justify-center gap-3 py-4 border border-gray-400 text-blue-600 rounded-2xl font-semibold"
            >
              <MdOutlineLockOpen size={22} />
              Change Password
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 border border-red-400 text-red-600 rounded-2xl font-semibold"
            >
              <AiOutlineLogout size={22} />
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;