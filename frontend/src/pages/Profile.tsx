import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useFetchProfile from "../utils/Hooks/FetchHooks/useFetchProfile";
import usePostProfile from "../utils/Hooks/PostHooks/usePostProfile";
import { Phone, Mail, MapPin, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Upload } from "lucide-react";


const Profile = () => {
  const { profile, loading: fetching, error: fetchError } = useFetchProfile();
  const { postProfile, loading: updating, error: updateError } = usePostProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: undefined as string | File | undefined,
  });

  // Update formData when profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        image: profile.image || "",
      });
      setImagePreview(typeof profile.image === "string" ? profile.image : null);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const success = await postProfile(formData); // Assuming this function returns a success flag or updated profile data
  if (success) {
    setIsEditing(false);
    // Manually update the state so changes reflect immediately
    Object.assign(profile, formData);
  }
};


  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#a0c878]">
        <p className="text-green-700 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#a0c878]">
        <p className="text-red-600">{fetchError}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen pt-36">
      <Card className="w-full max-w-xl shadow-lg border-green-100">
        <CardContent className="p-0">
          <div className="flex flex-col items-center -mt-16 px-10">
            <div className="w-56 h-56 rounded-full border-4 border-white shadow-md bg-white overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-white text-5xl font-bold">
                  {profile?.first_name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="font-medium">@{profile?.username}</p>
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full flex items-center gap-2"
            >
              <Edit size={16} />
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </div>

          <div className="px-12 py-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                
                <div className="flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={(input) => input && (input.style.display = "none")}
                  />

                  {/* Button to Trigger File Input */}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 mt-2"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload size={16} />
                    Upload Profile Picture
                  </Button>
                </div>

                <div className="text-start">
                    <Label className="text-start" htmlFor="first_name">First Name</Label>
                    <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>

                <div className="text-start">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div className="text-start">
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="text-start">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="text-start">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                </div>

                <div className="text-start">
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                  
                <Button type="submit" disabled={updating} className="w-full">
                  {updating ? <Loader2 className="animate-spin mr-2" size={18} /> : "Save Changes"}
                </Button>
              </form>
            ) : (
              <div className="divide-y divide-green-100">
                <div className="flex justify-center items-center gap-3 py-2">
                  <Mail className="text-green-500" size={20} />
                  <p className="text-sm text-green-700 font-medium">Email</p>
                  <div>
                    <p className="text-gray-700">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3 py-2">
                  <Phone className="text-green-500" size={20} />
                  <h1 className="text-sm text-green-700 font-medium">Phone</h1>
                  <p className="text-gray-700">{profile?.phone_number}</p>
                </div>

                <div className="flex justify-center items-center gap-3 py-2">
                  <MapPin className="text-green-500" size={20} />
                  <p className="text-sm text-green-700 font-medium">Address</p>
                  <div>
                    <p className="text-gray-700">{profile?.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
