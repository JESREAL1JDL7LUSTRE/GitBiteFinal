import { ACCESS_TOKEN, REFRECH_TOKEN } from "@/api/constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

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
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="w-full px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Username or Email"
                    value={email_or_username}
                    onChange={(e) => setemail_or_username(e.target.value)}
                />
                
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white rounded-md ${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    } transition-all`}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
                <button onClick={() => nav('/signup')}>Sign Up</button>
                </form>
            </div>
            </div>

    );
}

export default SignInForm;
