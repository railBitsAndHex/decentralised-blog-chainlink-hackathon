import React from "react";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
export default function LoginBtn() {
  const { login, isAuthenticated, error, accounts, logout } = useAuth();
  useAccountsChanged();
  useNetworksChanged();
  return (
    <>
      <div>
        Login with Metamask Wallet
        {!isAuthenticated ? (
          <button onClick={login}>Connect</button>
        ) : (
          <button onClick={logout}>{accounts[0]}</button>
        )}
        <p>{error}</p>
      </div>
    </>
  );
}
