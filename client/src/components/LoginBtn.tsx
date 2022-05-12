import React from 'react'
import { useAuth } from '../context/AuthContext'
export default function LoginBtn() {
    const { login, isAuthenticated } = useAuth();
    return (
        <>
            <div>
                Login with Metamask Wallet
                <button onClick={login}>Connect</button>
            </div>
        </>
  )
}
