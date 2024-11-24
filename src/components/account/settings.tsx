import { signOut } from "next-auth/react"

export function Settings() {
    function logout() {
        signOut({ redirectTo: '/login' })
    }

    return(
        <div className="flex flex-col gap-5">
            <p className="text-[20px]">Account Settings</p>
            <button onClick={logout} className="px-10 py-5 rounded-xl bg-slate-800">Logout</button>
        </div>
    )
}