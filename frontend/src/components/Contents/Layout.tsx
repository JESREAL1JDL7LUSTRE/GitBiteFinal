import SideCart from "./SideCart";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSideCartOpen } = usePlanToOrder();

  return (
    <div className={`grid ${isSideCartOpen ? "grid-cols-[1fr_18rem]" : "grid-cols-1"} overflow-hidden`}>
      {/* Main Content */}
      <main className="p-2 overflow-auto">{children}</main>

      {/* Side Cart - Properly placed inside the grid */}
      {isSideCartOpen && (
          <aside className="w-80 h-screen fixed top-20 right-0 overflow-y-auto p-2">
          <SideCart />
        </aside>
      )}
    </div>
  );
};

export default Layout;
