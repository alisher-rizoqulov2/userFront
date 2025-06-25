import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center space-x-4 bg-blue-600 py-[10px] pr-[10px] shadow-md">
      <NavLink
        to={"/"}
        className="text-white text-lg font-mono hover:bg-[#8ad21e] duration-300 hover:rounded-[10px] font-bold flex items-center justify-center px-[20px] py-[5px]"
      >
        Create Users
      </NavLink>
      <div className="flex items-center space-x-3">
        <NavLink
          to={"/all-users"}
          className="text-white font-bold px-[10px] py-[7px] hover:bg-[#8ad21e] duration-300 hover:rounded-[10px]"
        >
          All Users
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
