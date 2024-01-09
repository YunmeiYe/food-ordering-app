'use client'
import { CartIcon } from '@/icons/CartIcon'
import { Button } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { CartContext } from '../providers'

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  let userName = user?.name || user?.email;
  if (user && userName?.includes(' ')) userName = userName.split(' ')[0];
  
  const {cartProducts} = useContext(CartContext)

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold uppercase text-2xl" href={'/'}>Pizza Fiesta</Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        {status === "authenticated" ? (
          <>
            <div>
              <Link href={'/profile'}>Hello, {userName}</Link>
            </div>
            <Button onClick={() => signOut()} color='primary' className="font-semibold rounded-full px-8 py-2">Log Out</Button>
            <Button as={Link} href='/cart' className='bg-transparent relative' startContent={<CartIcon className={'w-8'} />}>
              <span className='w-5 h-5 rounded-full bg-primary text-white text-sm text-center absolute right-3 top-0'>{cartProducts.length}</span>
            </Button>
          </>
        ) : (
          <>
            <Link href={'/login'}>Login</Link>
            <Button href={'/register'} color='primary' className='font-semibold rounded-full px-8 py-2' as={Link}>Sign Up</Button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header