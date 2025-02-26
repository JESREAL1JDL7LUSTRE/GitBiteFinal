import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "./Dropdowns/CategoryDropdown";

interface MobileNavProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const MobileNav = ({ open, setOpen, setSearchQuery }: MobileNavProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !document.getElementById("mobile-menu")?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleCategorySelect = (category: string) => {
      setSearchQuery(category);
    };

  return (
    open && (
      <div id="mobile-menu" className="absolute top-full left-0 w-full bg-white shadow-md flex justify-center font-medium py-4 z-50">
        <div className="flex flex-row items-center gap-10">
          <button onClick={() => handleNavClick("/")} className="hover:text-gray-600">Home</button>
          <CategoryDropdown setSearchQuery={handleCategorySelect} />
          <button onClick={() => handleNavClick("/previousorder")} className="hover:text-gray-600">Your Orders</button>
          <button onClick={() => handleNavClick("/about")} className="hover:text-gray-600">About Us</button>
        </div>
      </div>
    )
  );
};

export default MobileNav;
