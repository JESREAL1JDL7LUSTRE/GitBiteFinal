import { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/change-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Password changed successfully.");
    } else {
      setMessage(data.detail || "Error changing password.");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Change Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ChangePassword;
