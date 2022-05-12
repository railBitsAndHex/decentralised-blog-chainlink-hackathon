import React, { useState, useEffect, useContext, FC } from "react";
import { AuthContextInterface, AuthPropsType } from "../types/authContext_d_types";
import { AuthStateInitial } from "../states/AuthContext_s";

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'

import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'

const AuthContext = React.createContext<AuthContextInterface>(AuthStateInitial);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthPropsType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isThreeIdAuth, setIsThreeIdAuth] = useState(false);
    const [accounts, setAccounts] = useState<Array<string>>([]);
    const [error, setError] = useState("");
    const login = async () => {
        const mmProvider: any = await detectEthereumProvider();
        const threeID: any = new ThreeIdConnect();
        if (mmProvider) {

            console.log('Ethereum successfully detected!')
            const mmAccounts: Array<string> = await mmProvider.request({ method: 'eth_requestAccounts' });
            console.log(mmAccounts);
            if (mmAccounts.length !== 0) {
                setAccounts(mmAccounts);
                const chainId: string = await mmProvider.request({
                    method: 'eth_chainId'
                });
                if (parseInt(chainId) !== 4) {
                    setError("wrong network!");
                    console.log("Wrong network!")
                    return;
                }

                const authProvider = new EthereumAuthProvider(mmProvider, accounts[0])
                await threeID.connect(authProvider)

                const ceramic = new CeramicClient()
                const did = new DID({
                    // Get the DID provider from the 3ID Connect instance
                     provider: threeID.getDidProvider(),
                     resolver: {
                       ...get3IDResolver(ceramic),
                       ...getKeyResolver(),
                     },
                })
                await did.authenticate()
                ceramic.did = did
                return;
            }
            setError("Could not fetch accounts!");
            return;
        }
        setError("Metamask has not been installed!");
    }
    const value = { error, login, isAuthenticated, isThreeIdAuth };
    return (<AuthContext.Provider value={value}>{children }</AuthContext.Provider>)
}
