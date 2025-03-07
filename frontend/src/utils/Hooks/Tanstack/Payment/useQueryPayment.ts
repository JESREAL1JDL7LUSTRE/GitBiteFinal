import { getPaymentMethods, getPayments } from '@/api/PaymentApi';
import { PaymentItem, PaymentMethod } from '@/types/Types';
import { useQuery } from '@tanstack/react-query';

const useQueryPayment = () => {
    const useFetchPaymentMethods = () => {
        return useQuery<PaymentMethod[], Error>({
          queryKey: ["paymentMethods"],
          queryFn: getPaymentMethods,
        });
      };

    const useFetchPayment = () => {
        return useQuery<PaymentItem[], Error>({
            queryKey: ["payments"],
            queryFn: getPayments,
        })
    }
  return {
    useFetchPaymentMethods, useFetchPayment
}
}

export default useQueryPayment
