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
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 lg:py-24 gap-12">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            Organize What Matters, Move At Your Own Pace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-10 py-4 bg-[#77C2FF] rounded-[48px] border-2 border-b-4 border-black shadow-2xl font-semibold text-lg active:translate-y-0.5 transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="w-full sm:w-auto px-10 py-4 bg-white rounded-[48px] border-2 border-b-4 border-black font-semibold text-lg active:translate-y-0.5 transition-all"
            >
              Login
            </button>
          </div>
        </div>

        <img 
          src={flex1} 
          alt="" 
          className="w-full max-w-md lg:max-w-lg h-auto object-contain" 
        />
      </div>

      {/* How it Works Section */}
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <p className="text-4xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-16">
          A Simple Way To <br className="hidden md:block" /> Manage Your Tasks
        </p>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row bg-[#F6FBFF] rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center">
              <div>
                <p className="text-3xl md:text-4xl font-black mb-4">Create Your Tasks</p>
                <p className="text-lg text-gray-700">
                  Add What Matters, When It Matters Big <br className="hidden md:block" /> 
                  Goals Or Small Wins, All In One Place
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-12">
              <img src={flex2} alt="" className="max-h-80 w-full h-auto object-contain" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col md:flex-row-reverse bg-white rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center">
              <div>
                <p className="text-3xl md:text-4xl font-black mb-4">Update as You Go</p>
                <p className="text-lg text-gray-700">
                  Edit, prioritize, and track progress easily <br className="hidden md:block" /> 
                  as your day evolves.
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#F6FBFF] p-8 md:p-12">
              <img src={flex3} alt="" className="max-h-80 w-full h-auto object-contain" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col md:flex-row bg-[#F6FBFF] rounded-[60px] border border-b-4 overflow-hidden">
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center">
              <div>
                <p className="text-3xl md:text-4xl font-black mb-4">Stay Organized</p>
                <p className="text-lg text-gray-700">
                  Add What Matters, When It Matters Big <br className="hidden md:block" /> 
                  Goals Or Small Wins, All In One Place
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-12">
              <img src={flex4} alt="" className="max-h-80 w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials / Stats Section */}
      <div className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
        <p className="text-4xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-16">
          Loved By People Who <br className="hidden md:block" /> Get Things Done
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-[#F6FBFF] border border-b-4 rounded-[60px] p-8 text-center">
            <img src={eclipse1} alt="" className="mx-auto mb-4" />
            <p className="font-black text-2xl mb-3">OlaChi Maryam</p>
            <p className="text-gray-700">
              This App Completely Changed How I Plan My Day. Creating Tasks Is Simple, Updating Them Feels Effortless, And I Actually Finish What I Start Now.
            </p>
          </div>

          {/* Stat 1 */}
          <div className="bg-white border border-b-4 rounded-[60px] p-8 text-center flex flex-col justify-center min-h-[280px]">
            <p className="font-black text-7xl">32%</p>
            <p className="text-xl mt-4">Increase In Task Completion Rate</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#F6FBFF] border border-b-4 rounded-[60px] p-8 text-center">
            <img src={joseph} alt="" className="mx-auto mb-4" />
            <p className="font-black text-2xl mb-3">Joseph Ibrahim</p>
            <p className="text-gray-700">
              I Love How Organized Everything Feels Without Being Overwhelmed. It Fits Perfectly Into My Daily Routine And Keeps Me Focused.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-b-4 rounded-[60px] p-8 text-center flex flex-col justify-center min-h-[280px]">
            <p className="font-black text-7xl">3X</p>
            <p className="text-xl mt-4">Better Daily Focus And Consistency</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#F6FBFF] border border-b-4 rounded-[60px] p-8 text-center">
            <img src={wasiu} alt="" className="mx-auto mb-4" />
            <p className="font-black text-2xl mb-3">Wasiu David</p>
            <p className="text-gray-700">
              Managing My Task Used To Be Stressful, But This Makes It Feel Calm And Intentional. I Get More Done With Less Pressure.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-b-4 rounded-[60px] p-8 text-center flex flex-col justify-center min-h-[280px]">
            <p className="font-black text-6xl">2.5 <span className="text-4xl">Hours</span></p>
            <p className="text-xl mt-4">Saved Per Week On Planning</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-5xl mx-auto bg-white border border-b-4 rounded-[60px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-3xl md:text-4xl font-black mb-4">Stay In The Loop</p>
            <p className="text-lg text-gray-700">
              Get Simple, Practical Insights On Productivity, Design, And Building Better Digital Experiences Delivered Straight To Your Inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <input
                type="email"
                className="flex-1 h-14 px-6 border-2 border-b-4 border-black rounded-[46px]"
                placeholder="Enter your mail here"
              />
              <button className="h-14 px-10 bg-[#77C2FF] border-2 border-b-4 border-black rounded-[48px] font-semibold">
                Subscribe
              </button>
            </div>
          </div>
          <img src={stayloop} alt="" className="max-w-xs w-full h-auto" />
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
        <div className="text-center mt-16 text-[180px] md:text-[250px] font-light text-black leading-none">
          Fony
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
