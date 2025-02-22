// src/hooks/useFetchProfile.ts
import { useState, useEffect } from "react";
import api from "../../../api/api"; // Ensure this is the correct path for your API

export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
}

const useFetchProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get<ProfileData>("/api/profile/");
        setProfile(res.data);
      } catch {
        setError("Failed to fetch profile details");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return { profile, loading, error };
};

export default useFetchProfile;
