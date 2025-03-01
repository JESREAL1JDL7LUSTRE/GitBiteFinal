import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ACCESS_TOKEN, REFRECH_TOKEN } from "@/api/constant";
import logo from "../assets/logo.png";
import api from "@/api/api";

const SignIn = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex bg-white"
    >
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Form Section */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 md:p-12 lg:p-16"
        >
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </motion.div>
        
        {/* Image Section */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden lg:block w-1/2 bg-[#f5f5f7] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black "></div>
          <div className="absolute inset-0 flex items-center justify-center ">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white text-center"
            >
              <img src={logo} alt="Logo" className="" />
              
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface SignInFormProps {
  route?: string;
}

function SignInForm({ route = "/api/token/" }: SignInFormProps) {
  const [email_or_username, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      
      const res = await api.post(route, { email_or_username, password });
      if (res.data.access) {
         localStorage.setItem(ACCESS_TOKEN, res.data.access);
         localStorage.setItem(REFRECH_TOKEN, res.data.refresh);
         nav("/");
         window.location.reload();
       } else {
         nav("/signin");
       }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-sm border-0 overflow-hidden bg-white">
        <CardHeader className="pb-2">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-light text-center text-gray-800">Welcome back!</CardTitle>
            <p className="text-center text-gray-500 mt-2 text-sm">
              Enter your credentials to access your account
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-5"
            >
              <div className="space-y-2 text-start">
                <label htmlFor="email" className="text-sm text-start font-medium text-gray-700">
                  Email or Username
                </label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  value={email_or_username}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="h-11 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                  required
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-11 rounded-lg font-medium bg-[#a0c878] hover:bg-[#8fb86a] text-white transition-all duration-300 shadow-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : "Sign In"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2 pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <span 
                className="text-[#a0c878] font-medium cursor-pointer hover:underline transition-all"
                onClick={() => nav("/signup")}
              >
                Create an account
              </span>
            </p>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default SignIn;