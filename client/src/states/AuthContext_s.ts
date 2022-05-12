import { AuthContextInterface } from './../types/authContext_d_types';
const AuthStateInitial : AuthContextInterface = {
    isAuthenticated: false,
    isThreeIdAuth: false,
    error: "",
    login: () => console.log("Login from context"),
    threeIdLogin: () => console.log("Three Id login from context")
}

export {AuthStateInitial}