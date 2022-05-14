import React, { useState, useEffect, useContext } from "react";
import { AuthContextInterface, AuthPropsType } from "../types/authContext";
import { AuthStateInitial } from "../states/AuthContext.s";
import detectEthereumProvider from "@metamask/detect-provider";
import { networkConfig } from "../states/networkStates.s";

const AuthContext = React.createContext<AuthContextInterface>(AuthStateInitial);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthPropsType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [error, setError] = useState("");
  const login = async () => {
    const mmProvider: any = await detectEthereumProvider();
    if (mmProvider) {
      console.log("Ethereum successfully detected!");
      const mmAccounts: Array<string> = await mmProvider.request({
        method: "eth_requestAccounts",
      });
      if (mmAccounts.length !== 0) {
        setAccounts(mmAccounts);
        setIsAuthenticated(true);
        const chainId: string = parseInt(
          await mmProvider.request({
            method: "eth_chainId",
          })
        ).toString();
        if (networkConfig.networks[chainId] === undefined) {
          setError("Wrong network!");
          return;
        }
        return;
      }
      setError("Could not fetch accounts!");
      return;
    }
    setError("Metamask has not been installed!");
  };
  const logout = () => {
    setIsAuthenticated(false);
    setAccounts([]);
    setError("");
  };
  const value = {
    error,
    setError,
    login,
    isAuthenticated,
    setIsAuthenticated,
    accounts,
    setAccounts,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
