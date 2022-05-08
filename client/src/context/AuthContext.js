import React, { useContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { authenticate, isAuthenticated, user } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate()
        .then(function (user) {
          console.log(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const value = { login, user, isAuthenticated };
  return (
    <AuthContext.Provider value={value}>
      {/* If we are not loading then we want to render out the children */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
