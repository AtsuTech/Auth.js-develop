//"use client"
import { useEffect } from "react";
import { auth } from "../auth"

export default async function Dashboard() {
    const session = await auth()
 
    //if (!session?.user) return null
    console.log(session)

    // useEffect(() => {
    //     if (!session) {
    //     window.location.href = "/";
    //     }
    // }, [session]);
    
    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)] px-10">
            <section className="w-96 shadow-lg bg-slate-300 p-3 rounded-md">
                <h1 className="text-2xl font-bold">ダッシュボード</h1>
                <div className="w-96">
                    {session?.user &&
                        <div>
                            {session.user.image ? <img src={session.user.image} className="w-10 h-10 rounded-full" alt="" />:""}
                            <p>{session.user.name}</p>
                            <p>{session.user.email}</p>
                            <p></p>
                        </div>
                    }
                </div>                   
            </section>
        </div>
    );
}
