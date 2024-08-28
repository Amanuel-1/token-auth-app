"use client"

import { useUser } from "@/app/layers/userContext";


export default function NavBar(){
    const {user, setUser, logout} = useUser();
    return (
        <nav className="flex items-center justify-center gap-8 p-4 bg-gray-800 text-white">
          <a href="/" className="text-white">
            Home
          </a>
          <a href="/profile" className="text-white">
            profile
          </a>

          {
            user ? (
                <>
                <a href="/profile" className="text-white">
                profile
              </a>
              <a onClick={logout} className="text-white">
                Logout
              </a>
                </>
              
            ) : (
              <a href="/auth/login" className="text-white">
                login
              </a>
            )
          }
        
        </nav>
    )
}