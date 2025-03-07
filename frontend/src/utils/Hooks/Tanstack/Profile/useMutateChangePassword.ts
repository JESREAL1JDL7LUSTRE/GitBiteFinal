import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ChangePassApi";

const usePostChangePassword = () => {
  return useMutation<string, Error, { oldPassword: string; newPassword: string }>({
    mutationFn: ({ oldPassword, newPassword }) => changePassword(oldPassword, newPassword),
    retry: 1, // Retry once on failure
  });
};

export default usePostChangePassword;
