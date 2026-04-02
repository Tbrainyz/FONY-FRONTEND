import React from "react";
import flex1 from "../assets/flex1.svg";
import flex2 from "../assets/flex2.svg";
import flex3 from "../assets/flex3.svg";
import flex4 from "../assets/flex4.svg";
import eclipse1 from "../assets/Ellipse1.svg";
import joseph from "../assets/Joseph.svg";
import wasiu from "../assets/wasiu.svg";
import stayloop from "../assets/Stayloop.svg";
import footLogo from "../assets/Footerimg.svg"
import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import twitter from "../assets/twitter.svg"
import tiktok from "../assets/tiktok.svg"
import LandingNavBar from "../components/LandingNavBar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full ">
        <LandingNavBar />
      <div className="flex w-full px-25 h-126 items-center justify-between ">
        <div className="py-[81.5px]">
          <p className="w-173.5 h-85.25 font-black text-[76px] leading-18 ">
            Organize What Matters, Move At Your Own Pace
          </p>
          <div className="flex gap-4">
            <button onClick={()=>{navigate("/register")}} className="w-47.5 h-14 bg-[#77C2FF] rounded-[48px] border-2 border-b-4 border-black shadow-2xl ">
              Get Started
            </button>
            <button onClick={()=>{navigate("/login")}} className="w-47.5 h-14 bg-[##FFFFFF] rounded-[48px] border-b-4 border-black border-2">
              Login
            </button>
          </div>
        </div>
        <img className="w-126 h-126 " src={flex1} alt="" />
      </div>
      <div className="w-full px-25 h-374.25 mt-20 mx-auto">
        <p className="flex justify-center font-black text-[60px] text-center leading-18">
          A Simple Way To <br /> Manage Your Tasks
        </p>
        <div className="w-310 mx-auto h-101.25 rounded-[290px] flex overflow-hidden mt-12.5 border border-b-4 ">
          <div className="w-155 h-101.25 bg-[#F6FBFF] ">
            <img className="items-center mx-auto" src={flex2} alt="" />
          </div>
          <div className="w-155 h-101.25 flex flex-col justify-center ">
            <p className="text-[40px] font-black pl-17.5 ">Create Your Tasks</p>
            <p className="text-start pl-17.5 ">
              Add What Matters, When It Matters Big <br /> Goals Or Small Wins,
              All In One Place
            </p>
          </div>
        </div>
        <div className="w-310 mx-auto h-101.25 rounded-[290px] flex overflow-hidden mt-12.5 border border-b-4 ">
          <div className="w-155 h-101.25 flex flex-col justify-center ">
            <p className="text-[40px] font-black pl-36.75 ">Update as You Go</p>
            <p className="text-start pl-36.75 ">
              Edit, prioritize, and track progress easily <br /> as your day
              evolves.
            </p>
          </div>
          <div className="w-155 h-101.25 bg-[#F6FBFF] ">
            <img className="items-center py-5 mx-auto" src={flex3} alt="" />
          </div>
        </div>
        <div className="w-310 h-101.25 mx-auto rounded-[290px] flex overflow-hidden mt-12.5 border border-b-4 ">
          <div className="w-155 h-101.25 bg-[#F6FBFF] ">
            <img className=" mt-5 mx-auto" src={flex4} alt="" />
          </div>
          <div className="w-155 h-101.25 flex flex-col justify-center ">
            <p className="text-[40px] font-black pl-17.5 ">Create Your Tasks</p>
            <p className="text-start pl-17.5 ">
              Add What Matters, When It Matters Big <br /> Goals Or Small Wins,
              All In One Place
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-25 h-195.75 mt-20 mx-auto">
        <p className="flex justify-center font-black text-[60px] text-center leading-18">
          Loved By People Who <br /> Get Things Done
        </p>
        <div className="grid grid-cols-3 gap-5 mt-12.5">
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#F6FBFF] ">
            <div className="w-80.5 h-59.75 mx-auto">
              <img className="flex mx-auto mt-2.5" src={eclipse1} alt="" />
              <p className="font-black text-[30px] text-center">
                OlaChi Maryam
              </p>
              <p className="font-normal text-[20px] text-center ">
                This App Completely Changed How I Plan My Day. Creating Tasks Is
                Simple, Updating Them Feels Effortless, And I Actually Finish
                What I Start Now.
              </p>
            </div>
          </div>
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#FFFFFF] ">
            <div className="w-80.5 py-[52.5px] flex flex-col items-center h-59.75 mx-auto">
              <p className="font-black text-[80px] text-center">32%</p>
              <p className="font-normal text-[20px] text-center ">
                Increase In Task Completion Rate
              </p>
            </div>
          </div>
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#F6FBFF] ">
            <div className="w-80.5 h-59.75 mx-auto">
              <img className="flex mx-auto mt-2.5" src={joseph} alt="" />
              <p className="font-black text-[30px] text-center">
                Joseph Ibrahim
              </p>
              <p className="font-normal text-[20px] text-center ">
                I Love How Organized Everything Feels Without Being Overwhelmed.
                It Fits Perfectly Into My Daily Routine And Keeps Me Focused.
              </p>
            </div>
          </div>
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#FFFFFF] ">
            <div className="w-80.5 h-59.75 mx-auto">
              <p className="font-black text-[80px] mt-[49.5px] text-center">
                3X
              </p>
              <p className="font-normal mt-3 text-[20px] text-center ">
                Better Daily Focus And Consistency
              </p>
            </div>
          </div>
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#F6FBFF] ">
            <div className="w-80.5 h-59.75 mx-auto">
              <img className="flex mx-auto mt-2.5" src={wasiu} alt="" />
              <p className="font-black text-[30px] text-center">Wasiu David</p>
              <p className="font-normal text-[20px] text-center ">
                Managing My Task Used To Be Stressful, But This Makes It Feel
                Calm And Intentional. I Get More Done With Less Pressure.
              </p>
            </div>
          </div>
          <div className="w-100 h-72.5 rounded-[210px] border border-b-4 bg-[#FFFFFF] ">
            <div className="w-80.5 h-59.75 mx-auto">
              <p className="font-black text-[80px] text-center leading-18 pt-[38.5px] ">
                2.5 <span>Hours</span>
              </p>
              <p className="font-normal text-[20px] mt-3 text-center ">
                Saved Per Week On Planning
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-310 h-101.25 mx-auto rounded-[290px] flex overflow-hidden mt-12.5 border border-b-4 ">
        <div className="w-155 h-101.25 flex flex-col justify-center ">
          <p className="text-[40px] font-black pl-17.5 ">Stay In The Loop</p>
          <p className="text-start pl-17.5 ">
            Get Simple, Practical Insights On Productivity, Design, And Building
            Better Digital Experiences Delivered Straight To Your Inbox.
          </p>
          <div className="flex gap-4 mt-3 pl-17.5 ">
            <input
              className="w-78.75 pl-4.75  h-14 rounded-[46px] border-2 border-b-4 "
              type="email"
              placeholder="Enter your mail here"
            />
            <button className="w-34.5 h-14 border-2 border-b-4 rounded-[48px] bg-[#77C2FF] ">
              Suscribe
            </button>
          </div>
        </div>
        <div className="w-155 h-101.25 bg-[#F6FBFF] ">
          <img className="items-center mx-auto" src={stayloop} alt="" />
        </div> 
      </div>
      <footer className="mt-20 w-full mx-auto flex gap-15 px-24.75 mb-10 ">
        <img src={footLogo} alt="" />
        <div className="w-195 h-100 ">
          <div className="flex justify-between w-full">
            <div className="flex gap-10">
              <p>Home</p>
              <p>Benefits</p>
              <p>Testimonial</p>
            </div>
            <div className="flex gap-5.5 ">
              <img src={facebook} alt="" />
              <img src={instagram} alt="" />
              <img src={twitter} alt="" />
              <img src={tiktok} alt="" />
            </div>
          </div>
          <div className="txt h-89 ">
            <p className="text-[300px] font-normal relative bottom-14 ">Fony</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
