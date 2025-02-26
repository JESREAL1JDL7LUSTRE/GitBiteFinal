import React, { useEffect, useState } from "react";
import useFetchProfile from "@/utils/Hooks/FetchHooks/useFetchProfile";
import usePostProfile from "@/utils/Hooks/PostHooks/usePostProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { profile, loading: fetching, error: fetchError } = useFetchProfile();
  const { postProfile, loading: updating, error: updateError } = usePostProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: undefined as string | File | undefined, // Supports both file upload and existing URL
  });

  // Set default form values when profile data is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        image: profile.image || "", // Keep existing image URL
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postProfile(formData);
    navigate("/profile");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}
      {updateError && <p className="text-red-500 mb-4">{updateError}</p>}

      {fetching ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="image">Profile Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {typeof formData.image === "string" && formData.image && (
              <img src={formData.image} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
            )}
          </div>

          <Button type="submit" disabled={updating} className="w-full">
            {updating ? <Loader2 className="animate-spin mr-2" size={18} /> : "Save Changes"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
