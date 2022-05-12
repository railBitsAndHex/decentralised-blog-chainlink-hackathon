import React, {ReactNode} from "react"
export interface AuthContextInterface {
    clickBool?: boolean,
    login?: () => void,
}
export type AuthPropsType = {
    children: ReactNode
}