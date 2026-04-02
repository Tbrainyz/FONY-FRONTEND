import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
