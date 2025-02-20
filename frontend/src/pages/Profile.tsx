
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Profile</h2>
        
        {profile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {profile.first_name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{profile.first_name} {profile.last_name}</p>
                <p className="text-sm text-gray-500">@{profile.username}</p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <p><strong className="text-gray-600">Email:</strong> {profile.email}</p>
              <p><strong className="text-gray-600">Phone:</strong> {profile.phone_number}</p>
              <p><strong className="text-gray-600">Address:</strong> {profile.address}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No profile available</p>
        )}
      </div>
    </div>

  );
};

export default Profile;
