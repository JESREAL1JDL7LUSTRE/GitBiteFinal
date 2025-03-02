import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingBag, Info, Heart } from "lucide-react"; // Import icons from lucide-react
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
    scrollToTop(); // Scroll to top when navigating
  };

  const handleCategorySelect = (category: string) => {
    setSearchQuery(category);
    setOpen(false); // Close the menu after selecting a category
    scrollToTop(); // Scroll to top when selecting a category
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    open && (
      <div
        id="mobile-menu"
        className="absolute top-full left-0 w-full bg-white shadow-md flex justify-center font-medium py-4"
      >
        <div className="flex flex-row items-center gap-10">
          <button onClick={() => handleNavClick("/")} className="hover:text-gray-600">
            <Home className="w-6 h-6" />
          </button>
          <CategoryDropdown setSearchQuery={handleCategorySelect} />
          <button onClick={() => handleNavClick("/previousorder")} className="hover:text-gray-600">
            <ShoppingBag className="w-6 h-6" />
          </button>
          <Link to="/cart" className="hover:text-gray-600" onClick={scrollToTop}>
            <Heart className="w-6 h-6" />
          </Link>
          <button onClick={() => handleNavClick("/about")} className="hover:text-gray-600">
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>
    )
  );
};

export default MobileNav;
