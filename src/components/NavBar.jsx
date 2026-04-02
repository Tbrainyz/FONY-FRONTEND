import React, { useState, useContext } from "react";
import logo from "../assets/Logo.svg";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ get user

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ current route

  const { user } = useContext(AuthContext); // ✅ logged in user

  return (
    <div className="flex relative z-10 justify-between h-[100px] px-[100px] py-[30px] border-b-[1px] border-[#D9D9D9]">
      
      {/* LOGO */}
      <img src={logo} alt="" className="w-[124px] h-[40px]" />

      {/* NAV LINKS */}
      <div className="flex font-md font-[Montserrat] gap-4 text-[16px] w-[377px] h-[40px] items-center text-center leading-[20px]">
        
        {/* DASHBOARD */}
        <p
          onClick={() => navigate("/dashboard")}
          className={`w-[124px] h-[40px] rounded-[22px] py-[10px] px-[19px] cursor-pointer transition
            ${location.pathname === "/dashboard"
              ? "bg-[#77C2FF] text-black"
              : "bg-[#F1F1F180]"}
          `}
        >
          Dashboard
        </p>

        {/* COMPLETED */}
        <p
          onClick={() => navigate("/completed")}
          className={`w-[125px] h-[40px] rounded-[22px] py-[10px] px-[19px] cursor-pointer transition
            ${location.pathname === "/completed"
              ? "bg-[#77C2FF] text-black"
              : "bg-[#F1F1F180]"}
          `}
        >
          Completed
        </p>
      </div>

      {/* PROFILE */}
      <div>
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={
              user?.profilePicture
                ? user.profilePicture   // ✅ from backend
                : "/default-avatar.png" // fallback
            }
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
          />

          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute right-10 top-20 z-50 animate-in fade-in zoom-in duration-200">
            <ProfileDropDown setOpen={setIsOpen}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;