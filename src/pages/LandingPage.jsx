import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import foot from "../assets/Foot.svg";
import flex1 from "../assets/flex1.svg";
import flex2 from "../assets/flex2.svg";
import flex3 from "../assets/flex3.svg";
import flex4 from "../assets/flex4.svg";
import eclipse1 from "../assets/Ellipse1.svg";
import joseph from "../assets/Joseph.svg";
import wasiu from "../assets/wasiu.svg";
import stayloop from "../assets/Stayloop.svg";
import footLogo from "../assets/Footerimg.svg";

import LandingNavBar from "../components/LandingNavBar";
import SocialDock from "../components/SocialDock";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <LandingNavBar />

      {/* ================= HERO ================= */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 lg:py-28 gap-16">

        {/* Glow background */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full"></div>

        <div className="max-w-xl lg:max-w-2xl relative z-10">
          <p className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
            Organize What Matters,
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Move At Your Own Pace
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-xl hover:scale-105 transition"
              >
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-xl hover:scale-105 transition"
                >
                  Get Started
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-10 py-4 rounded-full border border-gray-300 dark:border-gray-700 backdrop-blur-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        <img
          src={flex1}
          alt=""
          className="w-full max-w-md lg:max-w-lg hover:scale-105 transition duration-500"
        />
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div id="how-it-works" className="px-6 md:px-12 lg:px-20 py-20">

        <p className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-20 text-gray-900 dark:text-white">
          A Simple Way To Manage Your Tasks
        </p>

        <div className="space-y-16 max-w-6xl mx-auto">

          {[flex2, flex3, flex4].map((img, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row items-center gap-10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-[40px] p-8 shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex-1">
                <p className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                  {i === 0
                    ? "Create Your Tasks"
                    : i === 1
                    ? "Update as You Go"
                    : "Stay Organized"}
                </p>

                <p className="text-gray-600 dark:text-gray-400">
                  {i === 0
                    ? "Add what matters when it matters. Big goals or small wins, all in one place."
                    : i === 1
                    ? "Edit, prioritize, and track progress easily as your day evolves."
                    : "Keep everything structured and clear without feeling overwhelmed."}
                </p>
              </div>

              <img
                src={img}
                alt=""
                className="max-h-72 group-hover:scale-105 transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= TESTIMONIALS ================= */}
      <div id="testimonials" className="px-6 md:px-12 lg:px-20 py-20">

        <p className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900 dark:text-white">
          Loved By People Who Get Things Done
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[eclipse1, joseph, wasiu].map((img, i) => (
            <div
              key={i}
              className="p-8 rounded-[30px] bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow hover:shadow-xl transition"
            >
              <img src={img} className="mx-auto mb-4 w-16" />

              <p className="font-bold text-lg text-center text-gray-900 dark:text-white">
                {["OlaChi Maryam", "Joseph Ibrahim", "Wasiu David"][i]}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                This app completely changed how I manage my tasks.
              </p>
            </div>
          ))}

          {/* Stats cards */}
          <div className="p-10 text-center rounded-[30px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl">
            <p className="text-6xl font-black">32%</p>
            <p>Increase in productivity</p>
          </div>

          <div className="p-10 text-center rounded-[30px] bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
            <p className="text-6xl font-black">3X</p>
            <p>Better focus</p>
          </div>

          <div className="p-10 text-center rounded-[30px] bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
            <p className="text-5xl font-black">2.5h</p>
            <p>Saved weekly</p>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-5xl mx-auto p-10 rounded-[40px] bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col md:flex-row gap-10 items-center">

          <div className="flex-1">
            <p className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Stay In The Loop
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Get productivity insights delivered to your inbox.
            </p>

            <div className="flex gap-4 mt-6">
              <input
                type="email"
                className="flex-1 h-14 px-5 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent"
                placeholder="Enter your email"
              />

              <button className="px-8 rounded-full bg-blue-500 text-white font-semibold hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>

          <img src={stayloop} className="max-w-xs" />
        </div>
      </div>

      {/* ==================== FOOTER ==================== */}
     <footer className="relative px-6 md:px-12 lg:px-20 py-24 overflow-hidden">

  {/* 🔥 GLOW BACKGROUND */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] top-[-100px] left-[-100px] rounded-full"></div>
    <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>
  </div>

  {/* GLASS CONTAINER */}
  <div className="max-w-7xl mx-auto rounded-[40px] border border-white/20 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-10 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

      {/* BRAND */}
      <div>
        <img src={footLogo} alt="logo" className="w-40 mb-5" />

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Organize your life, track your progress, and stay consistent — beautifully.
        </p>

        <div className="mt-6 ">
          <SocialDock />
        </div>
      </div>

      {/* LINKS */}
      {[
        {
          title: "Product",
          links: ["Features", "Updates", "Roadmap"],
        },
        {
          title: "Company",
          links: ["About", "Careers", "Contact"],
        },
        {
          title: "Resources",
          links: ["Help Center", "Privacy", "Terms"],
        },
      ].map((section, i) => (
        <div key={i}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
            {section.title}
          </h3>

          <ul className="space-y-3 text-sm">
            {section.links.map((link, idx) => (
              <li
                key={idx}
                className="relative w-fit text-gray-600 dark:text-gray-400 cursor-pointer group"
              >
                {link}

                {/* 🔥 UNDERLINE ANIMATION */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* DIVIDER */}
    <div className="mt-16 border-t border-gray-200/50 dark:border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Fony Task Manager. All rights reserved.
      </p>

      <div className="flex gap-6 text-sm text-gray-500">
        {["Privacy", "Terms", "Cookies"].map((item, i) => (
          <span
            key={i}
            className="relative cursor-pointer group"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </span>
        ))}
      </div>
    </div>

    {/* EMAIL */}
    <p className="text-center mt-8 text-sm text-gray-500">
      fonytaskmanager2026@gmail.com
    </p>

  </div>
</footer>

    </div>
  );
};

export default LandingPage;