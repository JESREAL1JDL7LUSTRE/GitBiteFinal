import api from "./api";

/**
 * Sends a request to change the user's password.
 * @param oldPassword - The current password.
 * @param newPassword - The new password.
 * @returns A success message if the request is successful.
 */
export const changePassword = async (oldPassword: string, newPassword: string): Promise<string> => {
  try {
    const res = await api.post("/api/changepassword/", {
      old_password: oldPassword,
      new_password: newPassword,
    });

    return res.data.detail || "Password changed successfully.";
  } catch (error) {
    console.error("❌ Password change failed:", error);
    throw "Error changing password.";
  }
};

/**
 * Sends a request to reset the user's password.
 * @param email - The user's email.
 * @param username - The user's username.
 * @param phoneNumber - The user's phone number.
 * @param newPassword - The new password.
 * @returns A success message if the request is successful.
 */
export const forgotPassword = async (
  email: string,
  username: string,
  phoneNumber: string,
  newPassword: string
): Promise<string> => {
  try {
    const res = await api.post("/api/forgot-password/", {
      email,
      username,
      phone_number: phoneNumber,
      new_password: newPassword,
    });

    return res.data.detail || "Password reset successful.";
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    throw "Something went wrong. Please try again.";
  }
};
