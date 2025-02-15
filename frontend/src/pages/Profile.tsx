import { useEffect, useState } from "react";
import api from "../api/api";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null); // Correctly typed state

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await api.get<ProfileData>("/api/profile/"); // Ensure correct response type
      setProfile(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch profile details");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone_number}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
