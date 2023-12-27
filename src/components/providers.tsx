'use client'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react"

export const UIProvider = ({children}: { children: React.ReactNode })=> {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export const AppContextProvider = ({children}:{ children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}