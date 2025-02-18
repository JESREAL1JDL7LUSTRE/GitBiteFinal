import React from "react";
import { usePlanToOrder } from "./Context/PlanToOrderContext";
import OrderButton from "../DifferentButtons/OrderButton";

function PlanToOrderPopUp() {
  const { planToOrderList } = usePlanToOrder();

  return (
    <div className="bg-white border p-4 shadow-md">
      <h2 className="text-lg font-bold">Planned Orders</h2>
      {planToOrderList.length === 0 ? (
        <p>No dishes planned yet.</p>
      ) : (
        <ul>
          {planToOrderList.map((dish) => (
            <li key={dish.id} className="border-b py-2">
              <p>{dish.name} - ${dish.price}</p>
            </li>
          ))}
        </ul>
      )}
      {/* ✅ Pass `planToOrderList` directly instead of just dish IDs */}
      <OrderButton dishDetails={planToOrderList} />
    </div>
  );
}

export default PlanToOrderPopUp;
