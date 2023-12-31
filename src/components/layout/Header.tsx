'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { data: session, status } = useSession();

  const user = session?.user;
  let userName = user?.name || user?.email;
  if (user && userName?.includes(' ')) userName = userName.split(' ')[0];

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold uppercase text-2xl" href={'/'}>Pizza Fiesta</Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        {status === "authenticated" ? (
          <>
            <div>
              <Link href={'/profile'}>Hello, {userName}</Link>
            </div>
            <button onClick={() => signOut()} className="bg-primary rounded-full text-white px-8 py-2">Logout</button>
          </>

        ) : (
          <>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header