import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {UIProvider} from "./providers";

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
        <UIProvider>
          <main className='max-w-6xl mx-auto p-4 pb-0'>
            <Header />
            {children}
            <Footer />
          </main>
        </UIProvider>
      </body>
    </html>
  )
}
