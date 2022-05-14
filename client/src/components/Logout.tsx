import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };
  return (
    <>
      <button onClick={handleLogout}>Disconnect Wallet</button>
    </>
  );
}

export default Logout;
