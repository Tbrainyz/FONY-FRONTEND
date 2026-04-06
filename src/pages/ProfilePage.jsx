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
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error("Update failed");
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
      setPreview(user.profilePicture || DefaultProfile);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return <div className="text-center py-20 text-gray-600 dark:text-gray-400">Please log in to view profile</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Personal Information
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">
            <img
              src={preview}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-700 object-cover"
              onError={(e) => (e.target.src = DefaultProfile)}
            />
            {isEditing && (
              <label className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer text-sm font-semibold">
                <RiCameraAiLine size={24} />
                Change Profile Image
                <input type="file" hidden accept="image/*" onChange={handleImage} />
              </label>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-2xl 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           disabled:opacity-60 focus:outline-none focus:border-[#77C2FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-2xl 
                           bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-14 px-5 border border-gray-300 dark:border-gray-600 rounded-2xl 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           disabled:opacity-60 focus:outline-none focus:border-[#77C2FF]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 space-y-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-4 border-2 border-black dark:border-white rounded-2xl font-bold 
                           shadow-[0_4px_0_0_black] dark:shadow-[0_4px_0_0_white] 
                           active:translate-y-0.5 active:shadow-none transition-all
                           text-gray-900 dark:text-white"
              >
                Edit Profile Information
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-[#77C2FF] hover:bg-blue-500 text-white rounded-2xl font-bold 
                             disabled:opacity-70 transition-all"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                             rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="w-full flex items-center justify-center gap-3 py-4 border border-gray-400 dark:border-gray-600 
                         text-blue-600 dark:text-blue-400 rounded-2xl font-semibold 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <MdOutlineLockOpen size={22} />
              Change Password
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 border border-red-400 dark:border-red-600 
                         text-red-600 dark:text-red-400 rounded-2xl font-semibold 
                         hover:bg-red-50 dark:hover:bg-red-950 transition"
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