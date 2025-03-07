import { postPayment } from "@/api/PaymentApi"
import { PaymentData } from "@/types/Types"
import { useMutation } from "@tanstack/react-query"
const useMutationPayment = () => {
    const useMutationPaymentPost = () => {
        return useMutation ({
            mutationFn: (paymentData: PaymentData) => postPayment(paymentData)
        })
    }
  return (
    useMutationPaymentPost
  )
}

export default useMutationPayment
