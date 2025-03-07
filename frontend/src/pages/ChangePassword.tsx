import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import usePostChangePassword from "@/utils/Hooks/Tanstack/Profile/useMutateChangePassword";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { mutate: changePassword, data: message } = usePostChangePassword();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({ oldPassword, newPassword });
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
          Change Password
        </motion.h2>

        <CardContent>
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleChangePassword} 
            className="space-y-4"
          >
            <div>
              <Input 
                type="password" 
                placeholder="Old Password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                required 
                className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
              />
            </div>

            <div>
              <Input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                className="border-gray-300 focus:border-[#a0c878] focus:ring-[#a0c878]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#a0c878] hover:bg-[#8fb86a] text-white py-2 rounded-lg shadow-md"
            >
              Change Password
            </Button>
          </motion.form>

          {message && (
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

export default ChangePassword;
