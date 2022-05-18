import { useAuth } from "../context/AuthContext";
import { networkConfig } from "../states/networkStates.s";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBlogpost } from "../context/BlogpostContext";
const useAccountsChanged = () => {
    const {logout, setError, setAccounts, } = useAuth();
    const {setRetrieveBp, retrieveBp} = useBlogpost()
    const navigate = useNavigate();
    const ethProvider : any  = window.ethereum;
    if (ethProvider === undefined) {
        setError("Please install mm!")
        return
    }
    ethProvider.on('accountsChanged', async (accounts : Array<string>) => {
        if (accounts.length === 0) {
            logout();
            navigate("/home");
            return;
        }
        else {
            setRetrieveBp(!retrieveBp);
            setAccounts(accounts);
        }
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
