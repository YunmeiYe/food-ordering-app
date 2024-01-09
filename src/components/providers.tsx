'use client'
import MenuItem from '@/types/MenuItem'
import MenuItemAddOn from '@/types/MenuItemAddOn'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react"
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

type CartContext = {
  cartProducts: MenuItem[],
  setCartProducts: Dispatch<SetStateAction<MenuItem[]>>,
  addToCart: (product: MenuItem, selectedSize: MenuItemAddOn|null, selectedExtras: MenuItemAddOn[] | []) => void,
  clearCart: () => void,
  removeCartProduct: (index: number) => void
}

export const CartContext = createContext<CartContext>({} as CartContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<MenuItem[]>([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')!));
    }
  }, [])

  function addToCart(product: MenuItem, selectedSize: MenuItemAddOn|null, selectedExtras: MenuItemAddOn[] | []) {
    setCartProducts(prevProducts => {
      const newProducts = [...prevProducts, product];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: number) {
    setCartProducts(prevProducts => {
      const newProducts = prevProducts.filter((v, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    })
   }

  function saveCartProductsToLocalStorage(cartProducts: MenuItem[]) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, clearCart, removeCartProduct }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}