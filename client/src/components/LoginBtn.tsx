import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IUserProfile } from "./../types/profile.d";
import { createDefaultAccount } from "../states/profile.s";
import { useProfile } from "../context/ProfileContext";

import MetamaskIcon from "../images/metamaskicon.webp";

// Styling
import { Button } from "rsuite";
import "../styles/loginBtn.modules.css";
export default function LoginBtn() {
  const { login, isAuthenticated, error, accounts } = useAuth();
  const { createProfile } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login();
  };
  useEffect(() => {
    if (isAuthenticated && accounts.length !== 0) {
      const profileObjDefault: IUserProfile = createDefaultAccount(accounts[0]);
      createProfile(profileObjDefault);
      setIsLoading(false);
      navigate(`/profile-page/${accounts[0]}`);
    }
  }, [isAuthenticated]);
  return (
    <>
      <section>
        <Button
          appearance="ghost"
          color="orange"
          loading={isLoading}
          onClick={(e: React.FormEvent) => handleLogin(e)}
        >
          <div className="login-btn-div">
            <div className="login-label">Login with Metamask</div>
            <img className="mmask-icon" src={MetamaskIcon} />
          </div>
        </Button>
      </section>
    </>
  );
}
