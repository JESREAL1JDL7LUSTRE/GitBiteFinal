import { ACCESS_TOKEN, REFRECH_TOKEN } from "@/api/constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignInFormProps {
    route: string;
}

function SignInForm({ route }: SignInFormProps) {
    const [email_or_username, setemail_or_username] = useState(""); // Can be username or email
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
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full p-12 m-12 shadow-xl bg-green-400 overflow-hidden border rounded-xl">
                <div className="w-2/3 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
                    {/* Image Section */}
                </div>
                <div className="w-1/2 p-8">
                    <Card className="w-full shadow-lg">
                        <CardHeader>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-start py-1">Email or Username</h1>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Input
                                    type="text"
                                    placeholder="Username or Email"
                                    value={email_or_username}
                                    onChange={(e) => setemail_or_username(e.target.value)}
                                />
                            </form>
                            <h1 className="p-2 text-start px-6"></h1>
                            <h1 className="text-start py-2">Password</h1>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">    
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="text-center text-sm">
                            <div className="mtp-2">
                                <span className="text-gray-600 gap-2 justify-center">Don't have an account?</span>{" "}
                                <span
                                    className="text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => nav("/signup")}
                                >
                                    Create an account here
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
