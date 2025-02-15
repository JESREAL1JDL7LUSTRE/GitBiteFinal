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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="">
                <input
                    className=""
                    type="text"
                    placeholder="Username or Email"
                    value={email_or_username}
                    onChange={(e) => setemail_or_username(e.target.value)}
                />
                <input
                    className=""
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}

export default SignInForm;
