import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
}

export default SignOut;
