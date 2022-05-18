import { AuthContextInterface } from '../types/authContext';
const AuthStateInitial : AuthContextInterface = {
    isAuthenticated: false,
    accounts: [],
    error: "",
    login: () => console.log("Login from context"),
    logout: () => console.log("Logout from context"),
    setError: (err: string) => console.log(`err: ${err}`),
    setAccounts: (accounts: Array<string>) => console.log(accounts)
}

export {AuthStateInitial}