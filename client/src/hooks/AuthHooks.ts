import React, {useEffect} from "react"
import { useAuth } from "../context/AuthContext";
import { networkConfig } from "../states/networkStates.s";
import { useNavigate } from "react-router-dom";
import { useBlogpost } from "../context/BlogpostContext";
import { useProfile } from "../context/ProfileContext";
import { createDefaultAccount } from "../states/profile.s";
import { IUserProfile } from './../types/profile.d';
const useAccountsChanged = () => {
    const {logout, setError, setAccounts, } = useAuth();
    const {setRetrieveBp, retrieveBp} = useBlogpost()
    const {createProfile} = useProfile();
    const navigate = useNavigate();
    const ethProvider : any  = window.ethereum;
    if (ethProvider === undefined) {
        setError("Please install mm!")
        return
    }
    ethProvider.on('accountsChanged', async (accounts : Array<string>) => {
        logout();
        navigate("/home");
        return;
    })
}
const useNetworksChanged = () => {
    const {setError} = useAuth();
    const ethProvider : any  = window.ethereum;
    if (ethProvider === undefined) {
        setError("Please install mm!");
        return;
    }
    ethProvider.on('chainChanged', (chainId: string) => {
        if (networkConfig.networks[parseInt(chainId)] === undefined) {
            setError("Wrong network!");
            return;
        }
        setError("")
    })
}
export {useAccountsChanged, useNetworksChanged}
