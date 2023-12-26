'use client'
import {NextUIProvider} from '@nextui-org/react'

export function UIProvider({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}