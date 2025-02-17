
import useFetchProfile from "../utils/useFetchProfile"; // Import the custom hook

const Profile = () => {
  const { profile, loading, error } = useFetchProfile(); // Use the custom hook

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        <p>No profile available</p>
      )}
    </div>
  );
};

export default Profile;
