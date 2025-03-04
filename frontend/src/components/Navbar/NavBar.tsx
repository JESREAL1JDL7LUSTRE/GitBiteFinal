import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import IsSignInOrNot from "../User/IsSignInOrNot";
import SearchFunction from "./SearchFunction";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SideCartButton from "../Buttons/SideCartButton";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavBar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 bg-white shadow-md w-full z-20 h-20 transition-all duration-300 opacity-95">
      <div className="flex items-center justify-between px-3 py-1">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/Logo/logo.png" alt="logo" className="h-16 w-auto cursor-pointer" />
            <img src="/Logo/logoName.png" alt="logoName" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
          <div className="flex justify-end min-w-[100px] md:min-w-[150px] max-w-[250px] md:max-w-[300px]">
            <SearchFunction searchQuery={searchQuery} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <DesktopNav setSearchQuery={setSearchQuery} />
          </div>

          <SideCartButton type="open" />
          
          <IsSignInOrNot />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-1">
              {open ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="block md:hidden">
          <MobileNav open={open} setOpen={setOpen} setSearchQuery={setSearchQuery} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
