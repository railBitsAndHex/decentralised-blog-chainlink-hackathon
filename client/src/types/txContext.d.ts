import React, {ReactNode} from "react";
import { BigNumber, ContractInterface } from 'ethers';

interface contractInfo {
    [key:string]: {
        address: string
    }
}

interface chainId {
    [key:string]: contractInfo
}

export interface IMappings {
    [key:string]: chainId    
}

export type TSendOptions = {
    contractAddress: string,
    functionName: string,
    abi: object,
    params: {
        [key:string]: string | BigNumber
    }
}
export interface ITxContext {
    approveDep: boolean,
    donatedDep: boolean,
    setApproveDep: (approveDep: boolean)  => void,
    setDonatedDep: (donatedDep: boolean) => void,
    approve: (chainId: string) => void,
    donate: (amounts: BigNumber, donee: string, chainId: string) => void,
    withdraw: (chainId: string) => void
}

export type TxPropsType = {
    children: ReactNode
}