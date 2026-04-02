import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import profileImage from "../assets/FB_IMG_16265830618836469 1.png";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({ setOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[30px] shadow-2xl p-5 w-80 flex flex-col">
      {/* USER INFO */}
      <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
        <img
          src={user?.profilePicture || profileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover shadow-sm"
        />
        <div className="flex flex-col">
          <p className="text-[22px] font-bold text-gray-900 leading-tight">
            {user?.name || "User Name"}
          </p>
          <p className="text-gray-500 text-sm">
            {user?.email || "user@email.com"}
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col pt-4 gap-1">
        <button
          onClick={() => {
            navigate("/profile");
            setOpen(false);
          }}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-800 shadow-sm"
        >
          <HiOutlineUser className="text-2xl text-gray-700" />
          <span className="text-lg font-medium">View Profile</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-800 shadow-sm"
        >
          <HiOutlineLogout className="text-2xl text-gray-700" />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropDown;
