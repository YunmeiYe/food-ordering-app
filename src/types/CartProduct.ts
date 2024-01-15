import MenuItem from "./MenuItem"
import MenuItemAddOn from "./MenuItemAddOn"

type CartProduct = {
  _id?: string,
  menuItem: MenuItem,
  selectedSize: MenuItemAddOn | null,
  selectedExtras: MenuItemAddOn[]
}

export default CartProduct;