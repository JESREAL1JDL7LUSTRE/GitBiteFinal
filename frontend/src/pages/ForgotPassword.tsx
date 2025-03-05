import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import usePostForgotPassword from "@/utils/Hooks/PostHooks/usePostForgotPassword";

const ForgotPassword = () => {
  const { postForgotPassword, message, loading, error } = usePostForgotPassword();
  
  // ✅ Define state for input fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    postForgotPassword(email, username, phoneNumber, newPassword);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] px-4"
    >
      <Card className="w-full max-w-md shadow-xl border-0 bg-white p-6 rounded-lg">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-center text-gray-800 mb-4"
        >
          Forgot Password
        </motion.h2>

        <CardContent>
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleResetPassword} 
            className="space-y-4"
          >
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
            />
            <Input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
            />
            <Input 
              type="text" 
              placeholder="Phone Number" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
              className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
            />
            <Input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
              className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
            />

            <Button 
              type="submit" 
              className="w-full bg-[#a0c878] hover:bg-[#8fb86a] text-white py-2 rounded-lg shadow-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </motion.form>

          {/* ✅ Show error message if there's an error */}
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* ✅ Show success message */}
          {message && !error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-[#a0c878] font-medium"
            >
              {message}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ForgotPassword;
