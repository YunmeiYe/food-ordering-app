import { Dispatch, SetStateAction } from "react"
import CartProduct from "./CartProduct"
import MenuItem from "./MenuItem"
import MenuItemAddOn from "./MenuItemAddOn"

type CartContext = {
  cartProducts: CartProduct[],
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>,
  addToCart: (menuItem: MenuItem, selectedSize: MenuItemAddOn | null, selectedExtras: MenuItemAddOn[]) => void,
  clearCart: () => void,
  removeCartProduct: (index: number) => void
}

export default CartContext