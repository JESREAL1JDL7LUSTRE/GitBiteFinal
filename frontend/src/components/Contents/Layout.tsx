import React from "react";
import SideCart from "./SideCart";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";

const Layout2 = ({ children }: { children: React.ReactNode }) => {
  const { isSideCartOpen } = usePlanToOrder();

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ${
          isSideCartOpen ? 'mr-[320px]' : ''
        }`}
      >
        {children}
      </main>

      {/* Side Cart */}
      <aside 
        className={`fixed top-20 right-0 w-[320px] md:h-[calc(100vh-5rem)] h-[calc(90vh-5rem)] bg-white shadow-2xl transform transition-transform duration-300 ${
          isSideCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <SideCart />
      </aside>
    </div>
  );
};

export default Layout2;