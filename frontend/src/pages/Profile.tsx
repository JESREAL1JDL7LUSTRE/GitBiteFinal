import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useFetchProfile from "../utils/Hooks/FetchHooks/useFetchProfile";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Edit } from "lucide-react";

const Profile = () => {
  const { profile, loading, error } = useFetchProfile();
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#a0c878]">
        <p className="text-green-700 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#a0c878]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <Card className="w-full max-w-xl shadow-lg border-green-100">
        <CardContent className="p-0">
          
          {/* Centered profile image */}
          <div className="flex flex-col items-center -mt-16 px-6">
            <div className="w-48 h-48 rounded-full border-4 border-white shadow-md bg-white overflow-hidden">
              {profile?.image ? (
                <img src={profile.image} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-white text-5xl font-bold">
                  {profile?.first_name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            
            {/* User name and username */}
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className=" font-medium">@{profile?.username}</p>
            </div>
          </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => navigate("/editProfile")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Profile
              </Button>
            </div>
          
          {/* User information */}
          <div className="px-8 py-6">
            <div className="space-y-4 divide-y divide-green-100">
              <div className="flex items-center gap-3 py-2">
                <Mail className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-green-700 font-medium">Email</p>
                  <p className="text-gray-700">{profile?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <Phone className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-green-700 font-medium">Phone</p>
                  <p className="text-gray-700">{profile?.phone_number}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <MapPin className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-green-700 font-medium">Address</p>
                  <p className="text-gray-700">{profile?.address}</p>
                </div>
              </div>
            </div>
        
            

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;