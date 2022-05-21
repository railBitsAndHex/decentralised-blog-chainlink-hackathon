import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IUserProfile } from "./../types/profile.d";
import { createDefaultAccount } from "../states/profile.s";
import { useProfile } from "../context/ProfileContext";
export default function LoginBtn() {
  const { login, isAuthenticated, error, accounts } = useAuth();
  const { createProfile } = useProfile();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };
  useEffect(() => {
    if (isAuthenticated && accounts.length !== 0) {
      const profileObjDefault: IUserProfile = createDefaultAccount(accounts[0]);
      createProfile(profileObjDefault);
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
