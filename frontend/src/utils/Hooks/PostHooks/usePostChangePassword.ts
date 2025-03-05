import { useState } from "react";

const usePostChangePassword = () => {
  const [message, setMessage] = useState<string>("");

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/changepassword/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password changed successfully.");
      } else {
        setMessage(data.detail || "Error changing password.");
      }
    } catch  {
      setMessage("An error occurred. Please try again.");
    }
  };

  return { message, changePassword };
};

export default usePostChangePassword;
