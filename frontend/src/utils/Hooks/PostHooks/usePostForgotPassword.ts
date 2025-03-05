import { useState } from "react";

interface ForgotPasswordResponse {
  detail: string;
}

const usePostForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postForgotPassword = async (
    email: string,
    username: string,
    phoneNumber: string,
    newPassword: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/forgot-password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            username,
            phone_number: phoneNumber,
            new_password: newPassword,
          }),
        }
      );

      const data: ForgotPasswordResponse = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }
      setMessage(data.detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { postForgotPassword, message, loading, error };
};

export default usePostForgotPassword;