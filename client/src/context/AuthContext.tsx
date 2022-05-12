import React, { useState, useEffect, useContext, FC } from "react";
import { AuthContextInterface, AuthPropsType } from "../types/authContext_d_types";
import { AuthStateInitial } from "../states/AuthContext_s";


const AuthContext = React.createContext<AuthContextInterface>(AuthStateInitial);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({children}: AuthPropsType) => {
    const [clickBool, setClickBool] = useState(false)
    const login = () => {
        setClickBool(!clickBool)
        console.log("This is login")
    }
    const value = { login, clickBool };
    return (<AuthContext.Provider value={value}>{children }</AuthContext.Provider>)
}
