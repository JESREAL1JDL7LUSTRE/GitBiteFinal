import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Edit, Camera, User, Loader2 } from "lucide-react";
import useFetchProfile from "../utils/Hooks/FetchHooks/useFetchProfile";
import usePostProfile from "../utils/Hooks/PostHooks/usePostProfile";

const Profile = () => {
  const { profile, loading: fetching, error: fetchError } = useFetchProfile();
  const { postProfile, loading: updating, error: updateError } = usePostProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [tempImagePreview, setTempImagePreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: undefined as File | undefined | string,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

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
        image: profile.image || undefined,
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
      setTempImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await postProfile(formData);
    if (success) {
      setIsEditing(false);
      // Update the actual image preview only after successful save
      setImagePreview(tempImagePreview);
      // Manually update the state so changes reflect immediately
      Object.assign(profile, formData);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset temp image preview when canceling
    setTempImagePreview(null);
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        image: profile.image || undefined,
      });
    }
  };

  if (fetching) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]"
      >
        <Loader2 className="h-12 w-12 animate-spin text-[#a0c878]" />
        <p className="mt-4 text-[#a0c878] font-medium">Loading your profile...</p>
      </motion.div>
    );
  }

  if (fetchError) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]"
      >
        <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
          <p className="text-red-600 font-medium">{fetchError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-[#a0c878] hover:bg-[#8fb86a]"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] py-24 px-4"
    >
      <motion.div
        variants={itemVariants}
        className="max-w-xl mx-auto"
      >
        <Card className="w-full overflow-hidden shadow-xl border-0 bg-white relative">
          {/* Top decorative header */}
          <div className="h-32 bg-gradient-to-r from-[#a0c878] to-[#8fb86a] relative flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-32 transform -translate-x-1/2 "
            >
              <div className="relative group ">
                <div className="w-56 h-56 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  {isEditing && tempImagePreview ? (
                    <img src={tempImagePreview} alt="profile" className="w-full h-full object-cover" />
                  ) : imagePreview ? (
                    <img src={imagePreview} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#f5f5f7] text-[#a0c878]">
                      <User size={60} />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-2 right-2"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="image" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#a0c878] text-white cursor-pointer shadow-md hover:bg-[#8fb86a] transition-colors"
                    >
                      <Camera size={20} />
                    </label>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          <CardContent className="pt-32 pb-8 px-6">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <motion.h1 
                variants={itemVariants}
                className="text-2xl font-medium text-gray-800 p-2"
              >
                {profile?.first_name} {profile?.last_name}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-black font-semibold"
              >
                @{profile?.username}
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-[#a0c878] hover:bg-[#8fb86a] text-white px-6 py-2 rounded-full shadow-md transition-colors"
                >
                  <Edit size={16} />
                  Edit Profile
                </motion.button>
              ) : null}
            </motion.div>

            {!isEditing ? (
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <div className="text-center space-y-3">
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {profile?.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {profile?.phone_number}</p>
                  <p className="text-gray-700"><span className="font-medium">Address:</span> {profile?.address}</p>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600 flex" htmlFor="first_name">First Name</Label>
                    <Input 
                      type="text" 
                      id="first_name"
                      name="first_name" 
                      value={formData.first_name} 
                      onChange={handleChange} 
                      className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                      required 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-600 flex" htmlFor="last_name">Last Name</Label>
                    <Input 
                      type="text" 
                      id="last_name"
                      name="last_name" 
                      value={formData.last_name} 
                      onChange={handleChange} 
                      className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600 flex" htmlFor="username">Username</Label>
                  <Input 
                    type="text" 
                    id="username"
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                    required 
                  />
                </div>

                <div>
                  <Label className="text-gray-600 flex" htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                    required 
                  />
                </div>

                <div>
                  <Label className="text-gray-600 flex" htmlFor="phone_number">Phone Number</Label>
                  <Input 
                    type="tel" 
                    id="phone_number"
                    name="phone_number" 
                    value={formData.phone_number} 
                    onChange={handleChange} 
                    className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                    required 
                  />
                </div>

                <div>
                  <Label className="text-gray-600 flex" htmlFor="address">Address</Label>
                  <Input 
                    type="text" 
                    id="address"
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="mt-1 border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                    required 
                  />
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <Button 
                    type="submit" 
                    disabled={updating} 
                    className="bg-black hover:bg-[#8fb86a] text-white px-6"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Changes"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancelEdit}
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Profile;