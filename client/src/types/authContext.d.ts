import React, {ReactNode} from "react"
export interface AuthContextInterface {
    isAuthenticated: boolean,
    error: String,
    accounts: Array<String>, 
    login: () => void,
    threeIdLogin?: () => void,
    logout:() => void,
    setError:(err: string) =>void,
    setAccounts: (accounts: Array<string>) => void
}
export type AuthPropsType = {
    children: ReactNode
}