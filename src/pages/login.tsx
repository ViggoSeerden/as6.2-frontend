import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react'

export default function Login() {
    const router = useRouter()
    const error = router.query.error?.toString() ?? ''

    const { data: session } = useSession()

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (session) {
            console.log(session)
            router.push('/account')
        }

        if (error.length > 0) {
            setErrorMsg(error)
        }
    }, [error, session])

    function login() {
        signIn('auth0', { redirectTo: '/login' })
    }

    return (
        <div className="flex items-center justify-center w-screen">
            {session ?
                <div>Successfully logged in! Redirecting...</div>
                :
                <div className="px-10 py-5 bg-slate-800 rounded-xl">
                    <button onClick={login}>Login</button>
                    <p>{errorMsg}</p>
                </div>
            }
        </div>
    )
}