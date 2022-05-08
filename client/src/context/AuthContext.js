import React, { useContext, useState } from "react";
import { useMoralis } from "react-moralis";
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authenticate, user, logout } = useMoralis();

  const loginWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate();
        setIsAuthenticated(true);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
  };
  const logoutWallet = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (err) {
      setError(error);
      console.log(error);
    }
  };
  const value = {
    loginWallet,
    user,
    isAuthenticated,
    setIsAuthenticated,
    logoutWallet,
  };
  return (
    <AuthContext.Provider value={value}>
      {/* If we are not loading then we want to render out the children */}
      {children}
    </AuthContext.Provider>
  );
};
