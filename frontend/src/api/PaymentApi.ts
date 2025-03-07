import { PaymentData, PaymentMethod, PaymentItem } from "@/types/Types";
import api from "./api";

/**
 * Fetches available payment methods from the API.
 * @returns An array of payment methods.
 */
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const res = await api.get<{ payment_methods: [string, string][] }>("/api/payment-methods/");
    
    if (res.data.payment_methods && Array.isArray(res.data.payment_methods)) {
      return res.data.payment_methods.map(([value, label]) => ({ value, label }));
    } else {
      throw new Error("Unexpected data format for payment methods.");
    }
  } catch (error) {
    console.error("❌ Error fetching payment methods:", error);
    throw error;
  }
};

/**
 * Fetches payments from the API.
 * @returns An array of PaymentItem objects.
 */
export const getPayments = async (): Promise<PaymentItem[]> => {
  try {
    const res = await api.get<PaymentItem[]>("/api/payment/");
    console.log("✅ Fetched payments:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    throw error;
  }
};

/**
 * Posts a new payment to the API.
 * @param paymentData - The payment details to be sent.
 */
export const postPayment = async (paymentData: PaymentData): Promise<void> => {
  try {
    const res = await api.post("/api/payment/", paymentData);
    console.log("✅ Payment successful:", res.data);
  } catch (error) {
    console.error("❌ Payment failed:", error);
    throw error;
  }
};

