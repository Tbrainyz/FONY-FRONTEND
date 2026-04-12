import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/Logo.svg";
import darkmodelogo from "../assets/logodarkmode.svg";
import DefaultProfile from "../assets/FB_IMG_16265830618836469 1.png";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

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

  const handleLogoClick = () => {
    navigate("/");
  };

  const navBtnClass = (path) =>
    `px-5 py-2 rounded-2xl text-sm font-medium transition ${
      location.pathname === path
        ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
    }`;

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Logo"
            className="h-9 md:h-10 block dark:hidden"
          />
          <img
            src={darkmodelogo}
            alt="Logo"
            className="h-9 md:h-10 hidden dark:block"
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className={navBtnClass("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/completed")}
            className={navBtnClass("/completed")}
          >
            Completed
          </button>

          {/* ✅ ADMIN BUTTON (MOVED HERE) */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/authdash")}
              className="px-5 py-2 rounded-2xl text-sm font-medium transition 
                         bg-[#FFB347] text-black 
                         hover:brightness-95 
                         dark:bg-orange-400 dark:text-black"
            >
              Admin
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          {/* PROFILE */}
          <div ref={dropdownRef} className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user?.profilePicture || DefaultProfile}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                onError={(e) => (e.target.src = DefaultProfile)}
              />

              <IoIosArrowDown
                className={`transition text-gray-600 dark:text-gray-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-3 z-50">
                <ProfileDropDown setOpen={setIsOpen} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden border-t px-4 py-3 flex gap-2 bg-white dark:bg-gray-900">

        <button
          onClick={() => navigate("/dashboard")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium transition ${
            location.pathname === "/dashboard"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/completed")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium transition ${
            location.pathname === "/completed"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
          }`}
        >
          Completed
        </button>

        {/* ✅ MOBILE ADMIN BUTTON */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/authdash")}
            className="flex-1 py-2 rounded-2xl text-sm font-medium transition 
                       bg-[#FFB347] text-black 
                       dark:bg-orange-400 dark:text-black"
          >
            Admin
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
