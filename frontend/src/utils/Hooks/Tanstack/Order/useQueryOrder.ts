import { getOrders } from "@/api/OrderApi";
import { Order } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";

const useQueryOrder = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export default useQueryOrder;
