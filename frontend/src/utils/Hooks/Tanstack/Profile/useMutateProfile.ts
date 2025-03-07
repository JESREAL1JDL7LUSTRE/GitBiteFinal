import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/api/ProfileApi";
import { ProfileData } from "@/types/Types";

const usePostProfile = () => {
  return useMutation<ProfileData, Error, ProfileData>({
    mutationFn: updateProfile, // API call function
    onError: (error) => {
      console.error("❌ Profile update failed:", error);
    },
  });
};

export default usePostProfile;
