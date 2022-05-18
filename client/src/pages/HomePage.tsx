import React from "react";
import { Link } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useAuth } from "./../context/AuthContext";
function HomePage() {
  const { isAuthenticated, accounts } = useAuth();
  useAccountsChanged();
  console.log(accounts);
  return (
    <>
      <div>HomePage</div>
      <div>{accounts[0]}</div>
      {!isAuthenticated && <Link to="/login">Login</Link>}
    </>
  );
}

export default HomePage;
