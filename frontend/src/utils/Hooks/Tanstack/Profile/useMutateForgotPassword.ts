import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/ChangePassApi";

const usePostForgotPassword = () => {
  return useMutation<string, Error, { email: string; username: string; phoneNumber: string; newPassword: string }>({
    mutationFn: ({ email, username, phoneNumber, newPassword }) =>
      forgotPassword(email, username, phoneNumber, newPassword),
    retry: 1, // Retry once on failure
  });
};

export default usePostForgotPassword;
