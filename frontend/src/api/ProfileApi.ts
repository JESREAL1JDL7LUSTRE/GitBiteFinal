import { ProfileData } from "@/types/Types";
import api from "./api";

/**
 * Fetches the user's profile data from the API.
 * @returns The profile data.
 */
export const getProfileB = async (): Promise<ProfileData> => {
  try {
    const res = await api.get<ProfileData>("/api/profile/");
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    throw error;
  }
};

/**
 * Updates the user's profile data.
 * @param profileData - The profile data to update.
 * @returns The updated profile data.
 */
export const updateProfile = async (profileData: ProfileData): Promise<ProfileData> => {
  try {
    const formData = new FormData();

    // Append all fields except the image first
    Object.entries(profileData).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    });

    // Handle image separately if it's a File
    if (profileData.image instanceof File) {
      formData.append("image", profileData.image);
    }

    const res = await api.patch<ProfileData>("/api/profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Profile update failed:", error);
    throw error;
  }
};
