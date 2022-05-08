import React from "react";

import { useAuth } from "../context/AuthContext";
function LoginBtn() {
  const { login, isAuthenticated, user } = useAuth();
  return (
    <>
      <section>
        {isAuthenticated ? (
          <button>{user.get("ethAddress")}</button>
        ) : (
          <button onClick={() => login()}>Connect wallet</button>
        )}
      </section>
    </>
  );
}

export default LoginBtn;
