import React from "react";
import { useNavigate } from "react-router-dom";
import flex1 from "../assets/flex1.svg";
import flex2 from "../assets/flex2.svg";
import flex3 from "../assets/flex3.svg";
import flex4 from "../assets/flex4.svg";
import eclipse1 from "../assets/Ellipse1.svg";
import joseph from "../assets/Joseph.svg";
import wasiu from "../assets/wasiu.svg";
import stayloop from "../assets/Stayloop.svg";
import footLogo from "../assets/Footerimg.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import tiktok from "../assets/tiktok.svg";
import LandingNavBar from "../components/LandingNavBar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      <LandingNavBar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 lg:py-24 gap-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            Organize What Matters, Move At Your Own Pace
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 bg-[#77C2FF] rounded-full border-2 border-black shadow-[0_4px_0_0_black] font-semibold text-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 bg-white rounded-full border-2 border-black shadow-[0_4px_0_0_black] font-semibold text-lg"
            >
              Login
            </button>
          </div>
        </div>
        <img src={flex1} alt="" className="w-full max-w-md lg:max-w-lg" />
      </div>

      {/* How it Works */}
      <div className="px-6 md:px-12 lg:px-20 py-20">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          A Simple Way To Manage Your Tasks
        </h2>

        <div className="space-y-16 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row bg-[#F6FBFF] rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-10 md:p-16 flex items-center">
              <div>
                <h3 className="text-4xl font-black mb-4">Create Your Tasks</h3>
                <p className="text-lg text-gray-700">
                  Add What Matters, When It Matters. Big Goals Or Small Wins, All In One Place.
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white p-8">
              <img src={flex2} alt="" className="max-h-80" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col md:flex-row-reverse bg-white rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-10 md:p-16 flex items-center">
              <div>
                <h3 className="text-4xl font-black mb-4">Update as You Go</h3>
                <p className="text-lg text-gray-700">
                  Edit, prioritize, and track progress easily as your day evolves.
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#F6FBFF] p-8">
              <img src={flex3} alt="" className="max-h-80" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col md:flex-row bg-[#F6FBFF] rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-10 md:p-16 flex items-center">
              <div>
                <h3 className="text-4xl font-black mb-4">Stay Organized</h3>
                <p className="text-lg text-gray-700">
                  Add What Matters, When It Matters. Big Goals Or Small Wins, All In One Place.
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white p-8">
              <img src={flex4} alt="" className="max-h-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials / Stats */}
      <div className="px-6 md:px-12 lg:px-20 py-20 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Loved By People Who Get Things Done
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Testimonial cards and stats here - kept responsive */}
          {/* You can keep your original testimonial cards and just ensure they use responsive grid */}
        </div>
      </div>

      {/* Newsletter */}
      <div className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto bg-white border border-b-4 rounded-[60px] p-10 md:p-16 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h3 className="text-4xl font-black mb-4">Stay In The Loop</h3>
            <p className="text-lg text-gray-600">
              Get Simple, Practical Insights On Productivity, Design, And Building Better Digital Experiences Delivered Straight To Your Inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <input
                type="email"
                className="flex-1 h-14 px-6 border-2 border-black rounded-full"
                placeholder="Enter your mail here"
              />
              <button className="h-14 px-10 bg-[#77C2FF] border-2 border-black rounded-full font-semibold">
                Subscribe
              </button>
            </div>
          </div>
          <img src={stayloop} alt="" className="max-w-xs" />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-16 border-t">
        <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
          <img src={footLogo} alt="" />
          <div className="flex gap-8 text-lg">
            <p>Home</p>
            <p>Benefits</p>
            <p>Testimonial</p>
          </div>
          <div className="flex gap-6">
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={twitter} alt="" />
            <img src={tiktok} alt="" />
          </div>
        </div>
        <div className="text-center mt-16 text-[180px] md:text-[250px] font-light text-gray-100 leading-none">
          Fony
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;