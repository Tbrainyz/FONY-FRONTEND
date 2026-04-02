import React from "react";
import error from "../assets/error.jpg";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col items-center ">
      <img className="w-125 h-115" src={error} alt="" />
      <p className="text-[30px] font-bold font-[Montserrat]">Ooops!</p>
      <p className="my-4">Page Not Found.</p>
      <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-[#77C2FF] w-70 hover:bg-pink-700 h-12.5 p-2 border-b-5 rounded-4xl font-[Montserrat] font-bold cursor-pointer "
        >
          Back To Home
        </button>
    </div>
  );
}

export default ErrorPage;
