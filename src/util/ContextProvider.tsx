'use client'
import CartProduct from '@/types/CartProduct'
import CartContext from '@/types/CartContext'
import MenuItem from '@/types/MenuItem'
import MenuItemAddOn from '@/types/MenuItemAddOn'
import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext<CartContext>({} as CartContext);

export function calCartProductPrice(product: CartProduct): number {
  let price = product.menuItem.basePrice as number;
  if (product.selectedSize) {
    price += product.selectedSize.price as number;
  }
  if (product.selectedExtras.length > 0) {
    for (const extra of product.selectedExtras) {
      price += extra.price as number;
    }
  }
  return price;
}

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')!));
    }
  }, [ls])

  function addToCart(menuItem: MenuItem, selectedSize: MenuItemAddOn | null, selectedExtras: MenuItemAddOn[]) {
    setCartProducts(prevProducts => {
      const newProducts = [...prevProducts, { menuItem, selectedSize, selectedExtras }];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success('Added to cart');
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
    toast.success('Product removed from cart');
  }

  function saveCartProductsToLocalStorage(cartProducts: CartProduct[]) {
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