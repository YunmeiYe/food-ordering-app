import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {AppContextProvider, UIProvider} from "../components/providers";
import { Toaster } from 'react-hot-toast'

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
            <AppContextProvider>
              <Toaster/>
            <Header />
            {children}
            <Footer />
            </AppContextProvider>
          </main>
        </UIProvider>
      </body>
    </html>
  )
}
