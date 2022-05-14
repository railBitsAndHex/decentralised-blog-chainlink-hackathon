import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  const { login, isAuthenticated, error, accounts, logout } = useAuth();
  useAccountsChanged();
  useNetworksChanged();
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    await login();
  };
  useEffect(() => {
    if (isAuthenticated) {
      console.log(`hdLg is auth: ${isAuthenticated}`);
      navigate("/profile-page");
    }
  }, [isAuthenticated]);
  return (
    <>
      <div>
        Login with Metamask Wallet
        {/* {!isAuthenticated ? ( */}
        <button onClick={(e) => handleLogin(e)}>Connect</button>
        {/* // ) : (
        //   <button onClick={handleLogout}>{accounts[0]}</button>
        // )} */}
        <p>{error}</p>
      </div>
    </>
  );
}
