import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile-page");
    }
  }, [isAuthenticated]);
  return (
    <>
      <div>
        Login with Metamask Wallet
        <button onClick={(e) => handleLogin(e)}>Connect</button>
      </div>
    </>
  );
}
