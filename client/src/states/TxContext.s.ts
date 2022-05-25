import { ITxContext } from "../types/txContext";
import { BigNumber } from "ethers";
const InitialTxContext: ITxContext = {
    approveDep: false,
    donatedDep: false,
    setApproveDep: (approveDep: boolean)  => console.log("Set approve dep"),
    setDonatedDep: (donatedDep: boolean) => console.log("Set Donate dep"),
    approve: (chainId: string) => console.log("Approve tx"),
    donate: (amounts: BigNumber, donee: string, chainId: string) => console.log("Donate tx"),
    withdraw: (chainId: string) => console.log("withdraw")
}

export {InitialTxContext}