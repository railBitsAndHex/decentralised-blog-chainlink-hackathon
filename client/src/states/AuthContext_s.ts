import { AuthContextInterface } from './../types/authContext_d_types';
const AuthStateInitial : AuthContextInterface = {
    isAuthenticated: false,
    accounts: [],
    error: "",
    login: () => console.log("Login from context"),
    threeIdLogin: () => console.log("Three Id login from context"),
    logout: () => console.log("Logout from context")

}

export {AuthStateInitial}