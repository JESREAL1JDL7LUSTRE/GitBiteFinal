import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                nav("/signin"); // Redirect to sign-in after successful registration
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">Create an Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                        </div>
                        <Input
                                type="username"
                                placeholder="Username"
                                value={password}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        <Input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="terms" className="text-start text-xs text-gray-600">
                                I agree to the Data Privacy terms and conditions of GitCook.
                            </label>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-xs mt-1">
                    <div className="flex justify-center gap-2">
                        <span className="text-gray-600">Already have an account?</span>
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => nav("/signin")}
                        >
                            Sign in here
                        </span>
                    </div>
                </CardFooter>
            </Card>
    );
}

export default SignUpForm;
