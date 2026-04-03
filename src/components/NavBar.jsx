import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/Logo.svg";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-9 md:h-10" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-2 rounded-2xl font-medium transition ${location.pathname === "/dashboard" ? "bg-[#77C2FF] text-black" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/completed")}
            className={`px-6 py-2 rounded-2xl font-medium transition ${location.pathname === "/completed" ? "bg-[#77C2FF] text-black" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Completed
          </button>
        </div>

        {/* Profile */}
        <div ref={dropdownRef} className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <IoIosArrowDown className={`transition ${isOpen ? "rotate-180" : ""}`} />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-3 z-50">
              <ProfileDropDown setOpen={setIsOpen} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t px-4 py-3 flex gap-2 bg-white">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium ${location.pathname === "/dashboard" ? "bg-[#77C2FF]" : "bg-gray-100"}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/completed")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium ${location.pathname === "/completed" ? "bg-[#77C2FF]" : "bg-gray-100"}`}
        >
          Completed
        </button>
      </div>
    </nav>
  );
};

export default NavBar;