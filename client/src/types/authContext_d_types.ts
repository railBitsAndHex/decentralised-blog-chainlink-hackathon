import React, {ReactNode} from "react"
export interface AuthContextInterface {
    isAuthenticated: boolean,
    isThreeIdAuth: boolean,
    error: string,
    login?: () => void,
    threeIdLogin?: () => void
}
export type AuthPropsType = {
    children: ReactNode
}