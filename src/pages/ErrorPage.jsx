import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import hero from "../assets/Virtual-Reality--Streamline-Manila.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="px-6 sm:px-10 md:px-[100px] flex justify-between py-5 sm:py-[30px] items-center border-b border-[#D9D9D9]">
        <Link to="/">
          <img src={logo} alt="Fony" className="h-8 sm:h-auto" />
        </Link>
        <Link
          to="/"
          className="text-[14px] sm:text-[16px] font-medium text-[#666666] hover:text-[#0C0C0C] transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 px-6 sm:px-10 md:px-[100px] py-10 md:py-0">
        {/* Left */}
        <div className="flex flex-col gap-6 md:gap-[33px] w-full md:w-[550px] text-center md:text-left">
          <div className="flex flex-col gap-3">
            <p className="text-[#77C2FF] font-black text-[16px] sm:text-[20px] tracking-tight uppercase">
              404 Error
            </p>
            <h1 className="text-[48px] sm:text-[60px] md:text-[70px] font-black leading-[1.1] tracking-tight">
              Page Not Found
            </h1>
            <p className="text-[16px] sm:text-[20px] text-[#666666] font-medium tracking-tight leading-[1.4]">
              Looks like this page went off track. It may have been moved,
              deleted, or never existed. Let's get you back on schedule.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              to="/"
              className="bg-[#77C2FF] border-b-4 py-3 px-[49px] border-2 border-[#000000] rounded-[48px] text-[16px] font-bold w-full sm:w-auto text-center"
            >
              Go Home
            </Link>
            <Link
              to="/dashboard"
              className="bg-[#FFFFFF] border-b-4 py-3 px-[49px] border-2 border-[#000000] rounded-[40.5px] text-[16px] font-bold w-full sm:w-auto text-center"
            >
              Dashboard
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[14px] font-medium text-[#666666]">
            <Link to="/login" className="hover:text-[#77C2FF] transition">
              Login
            </Link>
            <span className="text-[#D9D9D9]">·</span>
            <Link to="/register" className="hover:text-[#77C2FF] transition">
              Register
            </Link>
            <span className="text-[#D9D9D9]">·</span>
            <Link to="/forgot" className="hover:text-[#77C2FF] transition">
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Right — illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            {/* Big 404 behind the image */}
            <p className="absolute inset-0 flex items-center justify-center text-[150px] sm:text-[200px] font-black text-[#F6FBFF] leading-none select-none z-0">
              404
            </p>
            <img
              src={hero}
              alt="Page not found"
              className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
