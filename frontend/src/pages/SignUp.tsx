import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import api from "@/api/api";


const SignUp = () => {
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
          <div className="w-full h-full max-w-md py-12 ">
            <SignUpForm route="/api/register/" />
          </div>
        </motion.div>
        
        {/* Image Section */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden lg:block w-1/2 bg-[#f5f5f7] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white text-center"
            >
              <img src="/Logo/logo.png" alt="Logo" className="mb-40" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
interface SignUpFormProps {
    route: string;
}
function SignUpForm({ route }: SignUpFormProps) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }
        if (!agreeToTerms) {
            alert("You must agree to the terms and conditions.");
            setLoading(false);
            return;
        }
        try {
             const res = await api.post(route, {
                 email,
                 username,
                 password,
                 first_name: firstName,
                 last_name: lastName,
                 phone_number: phoneNumber,
                 address,
             });
             if (res.status === 201) {
                 alert("Account created successfully!");
                 nav("/signin");
             }
        } catch (error) {
            alert(error);
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
            <Card className="shadow-sm border-0 overflow-hidden bg-white ">
                <CardHeader className="pb-1">
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <CardTitle className="text-2xl font-bold text-center text-gray-800">Welcome to GitCook!</CardTitle>
                        <p className="text-center text-gray-500 mt-1 text-sm">
                            Fill in your information to join our platform
                        </p>
                    </motion.div>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="space-y-2"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                                <div className="space-y-1">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700 text-start">
                                        First Name
                                    </label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1 text-start">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-1 text-start">
                                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                                <div className="space-y-1">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1 text-start">
                                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-1 text-start">
                                <label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="h-10 px-4 rounded-lg border border-gray-200 focus:border-[#a0c878] focus:ring-[#a0c878]"
                                />
                            </div>
                            
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-[#a0c878] focus:ring-[#a0c878]"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the Data Privacy{" "}
                                    <span 
                                    className="text-[#a0c878] font-medium cursor-pointer hover:underline transition-all"
                                    onClick={() => nav("/termsandconditions")}>
                                        terms and conditions
                                        </span>.
                                </label>
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
                                        Signing up...
                                    </div>
                                ) : "Sign Up"}
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
                            Already have an account?{" "}
                            <span 
                                className="text-[#a0c878] font-medium cursor-pointer hover:underline transition-all"
                                onClick={() => nav("/signin")}
                            >
                                Sign in
                            </span>
                        </p>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
export default SignUp;