import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Pizza Fiesta: Order Delicious Pizzas Online',
  description: 'Welcome to PizzaFiesta, where every order is a celebration of flavors!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-6xl mx-auto p-4 pb-0'>
          {children}
        </main>
      </body>
    </html>
  )
}
