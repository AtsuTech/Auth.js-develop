"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
 
export default function Navigation() {
  const { data: session } = useSession()
 
  return(
    <header className="w-full flex items-center bg-cyan-600 text-white font-bold p-6">

        <span>
            <Link href={"/"}>
                Authjs開発テスト(Credentials仕様)
            </Link>
        </span>
        <div className="ml-auto">
            {session?.user?
                <div className="flex items-center space-x-2">
                    <span>{session.user.name}</span>
                    {session.user.image &&
                        <img src={session.user.image} className="w-10 h-10 rounded-full" alt="" />
                    }
                    <button 
                        onClick={() => signOut()}
                        className="bg-purple-500 rounded-md text-white text-sm p-3"
                    >
                        Sign Out
                    </button>
                </div>
            :
                <div>
                    <Link href={"/signin"}>
                        Sign In
                    </Link>
                </div>
            }            
        </div>

    </header>
  )
}