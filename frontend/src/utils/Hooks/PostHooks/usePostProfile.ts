import { useState } from "react";
import api from "../../../api/api";

export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  image?: File | string; // Handle both file uploads and existing URLs
}

const usePostProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postProfile = async (profileData: ProfileData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append all fields except the image first
      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value as string);
        }
      });

      // Handle image separately
      if (profileData.image instanceof File) {
        formData.append("image", profileData.image);
      }

      const response = await api.patch("/api/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return response in case the caller needs it
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { postProfile, loading, error };
};

export default usePostProfile;
