import { forgotPassword } from "@/api/ChangePassApi";
import { useState } from "react";

const usePostForgotPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (
    email: string,
    username: string,
    phoneNumber: string,
    newPassword: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const successMessage = await forgotPassword(email, username, phoneNumber, newPassword);
      setMessage(successMessage);
    } catch (errorMessage) {
      setError(errorMessage as string);
    } finally {
      setLoading(false);
    }
  };

  return { postForgotPassword: handleForgotPassword, message, loading, error };
};

export default usePostForgotPassword;
