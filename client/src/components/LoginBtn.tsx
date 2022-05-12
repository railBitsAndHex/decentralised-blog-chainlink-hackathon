import React from 'react'
import { useAuth } from '../context/AuthContext'
export default function LoginBtn() {
    const { login, clickBool } = useAuth();
    return (
        <>
            <div>
                Click me to test context!
                <button onClick={login}>Test Context</button>
                <div>
                    Click: {clickBool ? "Clicked" : "Unclicked"}
                </div>
            </div>
        </>
  )
}
