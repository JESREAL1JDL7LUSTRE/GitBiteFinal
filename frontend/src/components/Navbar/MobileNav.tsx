import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ShoppingBag, Info, Heart, List } from "lucide-react"; // Import icons from lucide-react
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
  }, [open, setOpen]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setOpen(false);
    scrollToTop(); 
  };

  const handleCategorySelect = (category: string) => {
    setSearchQuery(category);
    setOpen(false); 
    scrollToTop(); 
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    open && (
      <div
        id="mobile-menu"
        className="absolute top-full left-0 w-full bg-white shadow-lg backdrop-blur-md rounded-b-lg transition-opacity duration-300 opacity-100"
      >
        <div className="flex flex-row items-center justify-around py-0">
          <button 
            onClick={() => handleNavClick("/")} 
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Home className="w-6 h-6" />
            <span className="text-sm font-medium">Home</span>
          </button>
          <button 
            onClick={() => handleNavClick("/previousorder")} 
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-sm font-medium">Your Orders</span>
          </button>
          <div 
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition" 
            onClick={(e) => e.stopPropagation()} 
          >
            <List className="w-6 h-6" />
            <CategoryDropdown setSearchQuery={handleCategorySelect} />
          </div>
          <button 
            onClick={() => handleNavClick("/cart")}  
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm font-medium">Wishlist</span>
          </button>
          <button 
            onClick={() => handleNavClick("/about")} 
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Info className="w-6 h-6" />
            <span className="text-sm font-medium">About Us</span>
          </button>
        </div>
      </div>
    )
  );
}
export default MobileNav;
