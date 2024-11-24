import { useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
    const { data: session } = useSession()

    return (
        <div className="top-0 w-full bg-slate-500 h-14 flex flex-row justify-between items-center px-5">
            <Link href="/">Osso Online</Link>
            <div className="flex flex-row gap-5">
                <Link href='/about'>About</Link>
                <Link href='/accommodations'>Accommodations</Link>
                <Link href='/tenants'>Tenants</Link>
            </div>
            <div>
                {session ?
                    <Link href='/account'>{session.user?.email}</Link>
                :
                    <Link href='/login'>Login</Link>
                }

            </div>
        </div>
    )
}