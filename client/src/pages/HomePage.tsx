import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
function HomePage() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div>HomePage</div>
      {!isAuthenticated && <Link to="/login">Login</Link>}
    </>
  );
}

export default HomePage;
