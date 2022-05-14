import React from "react";
import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <>
      <nav>{isAuthenticated && <Logout />}</nav>
    </>
  );
}

export default Navbar;
