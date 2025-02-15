import React from "react";
import NavbarMenu from "./NavbarMenu";

const DesktopNavbar = () => {
  return (
    <div className="w-full h-14 border-2 border-green-500 hidden md:flex items-center justify-between px-4">
      <div>Desktop Navbar</div>
      <div><NavbarMenu /></div>
    </div>
  );
};

export default DesktopNavbar;
