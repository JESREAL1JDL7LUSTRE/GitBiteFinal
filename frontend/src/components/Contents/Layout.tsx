import React from "react";
import SideCart from "./SideCart";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";

const Layout2 = ({ children }: { children: React.ReactNode }) => {
  const { isSideCartOpen } = usePlanToOrder();

  return (
    <div className="relative max-h-screen">
      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ${
          isSideCartOpen ? 'md:mr-[320px]' : ''
        }`}
      >
        {children}
      </main>


      {/* Side Cart (Right Side for Desktop) */}
      <aside
        className={`fixed top-20 right-0 w-[320px] md:h-[calc(100vh-5rem)] h-[calc(90vh-5rem)] bg-white shadow-2xl transform transition-transform duration-300 hidden md:block ${
          isSideCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SideCart />
      </aside>

      {/* Side Cart (Bottom for Mobile) */}
      <aside
        className={`fixed bottom-0 left-0 w-full h-[35vh] bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          isSideCartOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <SideCart />
      </aside>
    </div>
  );
};

export default Layout2;
