'use client'

import Link from "next/link"
import LoginBtn from "./loginBtn"
import LogoutBtn from "./logoutBtn"
import { useSession } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()
  
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
      <div className="flex space-x-4">
        <Link href="/" className="font-semibold hover:text-blue-600">Home</Link>
        <Link href="/list" className="font-semibold hover:text-blue-600">List</Link>
      </div>
      <div className="text-right w-full">
          {
            session 
              ? <span>안녕하세요 {session.user.name}님! <LogoutBtn/></span>
              : <LoginBtn />
          }
      </div>
    </nav>
  )
}