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
                
                <Card className="w-full max-w-sm shadow-lg p-3">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-center">Welcome Back!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                        type="text"
                        placeholder="Username or Email"
                        value={email_or_username}
                        onChange={(e) => setemail_or_username(e.target.value)}
                        />
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
                    <CardFooter className="text-start text-xs">
                        <div className="">
                            <span className="text-gray-600 gap-2 justify-center">Dont't have an account?</span>{" "}
                            <span 
                                className="text-[#a0c878] cursor-pointer hover:underline"
                                onClick={() => nav("/signup")}
                            >
                                Register!
                            </span>
                        </div>        

            </CardFooter>
        </Card>

    );
}

export default SignInForm;
