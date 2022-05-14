import { useAuth } from "../context/AuthContext";
import detectEthereumProvider from '@metamask/detect-provider';
import { networkConfig } from "../states/networkStates.s";
const useAccountsChanged = () => {
    const {logout, setError} = useAuth();
    const ethProvider : any  = window.ethereum;
    if (ethProvider === undefined) {
        setError("Please install mm!")
        return
    }
    ethProvider.on('accountsChanged', (accounts : Array<string>) => {
        if (accounts.length === 0) {
            logout();
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
