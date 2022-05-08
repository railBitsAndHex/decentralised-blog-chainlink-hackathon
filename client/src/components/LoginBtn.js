import React from "react";
import { useAuth } from "../context/AuthContext";
import { useMMDisconnect } from "../hooks/AuthHooks";
function LoginBtn() {
  const { loginWallet, isAuthenticated, user, logoutWallet } = useAuth();
  useMMDisconnect();
  return (
    <>
      <section>
        {isAuthenticated ? (
          <div>
            <button>{user.get("ethAddress")}</button>
            <button onClick={() => logoutWallet()}>Disconnect</button>
          </div>
        ) : (
          <button onClick={() => loginWallet()}>Connect wallet</button>
        )}
      </section>
    </>
  );
}

export default LoginBtn;
