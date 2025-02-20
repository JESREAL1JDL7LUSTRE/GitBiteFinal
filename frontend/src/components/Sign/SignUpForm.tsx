import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
            <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    
                    <button className="w-full py-2 text-white rounded-md bg-blue-500 hover:bg-blue-60 " type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
