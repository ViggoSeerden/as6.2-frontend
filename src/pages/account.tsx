import { Chats } from "@/components/account/chats";
import { Posts } from "@/components/account/posts";
import { Profile } from "@/components/account/profile";
import { SavedPosts } from "@/components/account/saved";
import { Settings } from "@/components/account/settings";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const [tab, setTab] = useState(<Profile />);

    let redirect = false

    if (!session) {
        redirect = true
    }

    useEffect(() => {
        if (redirect) {
            router.replace('/login')
        }

        // if (session) {
        //     fetch('http://localhost:5157/api/users', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${session?.accessToken}`
        //         }
        //     }).then(res => res.json())
        //         .then(data => {
        //             console.log(data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // }
    }, [redirect, session])

    return (
        <div>
            {session && session.user &&
                <div className="flex flex-row gap-5">
                    <div className="p-5 flex flex-col justify-start text-left bg-slate-800 rounded-l-xl h-[90vh] border-r-[1px] border-white">
                        <p className="text-[20px]">Welcome, {session.user.email}</p>
                        <div className="border-b-[1px] border-white my-5" />
                        <div className="flex flex-col gap-5 justify">
                            <button className="text-left" onClick={() => setTab(<Profile />)}>Your Profile</button>
                            <button className="text-left" onClick={() => setTab(<Posts />)}>Your Posts</button>
                            <button className="text-left" onClick={() => setTab(<SavedPosts />)}>Saved Posts</button>
                            <button className="text-left" onClick={() => setTab(<Chats />)}>Chats</button>
                            <button className="text-left" onClick={() => setTab(<Settings />)}>Settings</button>
                        </div>
                    </div>
                    <div>
                        {tab}
                    </div>
                </div>
            }
        </div>
    )
}