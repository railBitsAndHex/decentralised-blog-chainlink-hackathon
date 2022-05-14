import React, { useState, useEffect, useContext } from "react";
import {
  AuthContextInterface,
  AuthPropsType,
} from "../types/authContext_d_types";
import { AuthStateInitial } from "../states/AuthContext_s";
import detectEthereumProvider from "@metamask/detect-provider";
import { networkConfig } from "../states/networkStates_s";

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
      console.log(mmAccounts);
      if (mmAccounts.length !== 0) {
        setAccounts(mmAccounts);
        setIsAuthenticated(true);
        const chainId: string = parseInt(
          await mmProvider.request({
            method: "eth_chainId",
          })
        ).toString();
        if (networkConfig.networks[parseInt(chainId)] === undefined) {
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
  };
  const value = {
    error,
    login,
    isAuthenticated,
    accounts,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
