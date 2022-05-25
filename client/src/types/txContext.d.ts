import React, {ReactNode} from "react";
import { BigNumber } from 'ethers';

export interface IMappings {
    [key:string]: chainId
}

interface chainId {
    [key:string]: contractInfo
}

interface contractInfo {
    [key:string]: {
        address: string
    }
}

export interface ITxContext {
    approveDep: boolean,
    donatedDep: boolean,
    setApproveDep: (approveDep: boolean)  => void,
    setDonatedDep: (donatedDep: boolean) => void,
    approve: (amount: BigNumber, chainId: string) => void,
    donate: (amounts: BigNumber, donee: string, chainId: string) => void,
    withdraw: (chainId: string) => void
}

export type TxPropsType = {
    children: ReactNode
}