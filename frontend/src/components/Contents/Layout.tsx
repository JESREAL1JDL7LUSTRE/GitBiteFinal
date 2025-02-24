import SideCart from "./SideCart";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSideCartOpen } = usePlanToOrder();

  return (
    <div className={`grid h-screen ${isSideCartOpen ? "grid-cols-[1fr_17rem]" : "grid-cols-[1fr]"}`}>
      {/* Main Content */}
      <main className="p-2 overflow-auto">{children}</main>

      {/* SideCart - Show only when open */}
      {isSideCartOpen && (
        <aside className="w-80 fixed top-[64px] right-0 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-2">
            <SideCart />
          </div>
        </aside>
      )}
    </div>
  );
};

export default Layout;
