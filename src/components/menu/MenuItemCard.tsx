import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { CartContext } from "../providers";
import MenuItem from "@/types/MenuItem";
import MenuItemPopUp from "./MenuItemPopUp";
import toast from "react-hot-toast";
import MenuItemAddOn from "@/types/MenuItemAddOn";

interface MenuItemProps {
  menuItem: MenuItem;
}

const MenuItemCard = ({ menuItem }: MenuItemProps) => {
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);

  function handleAddToCartClick() {
    const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    if (hasOptions) {
      setShowPopUp(true);
    } else {
      addToCart(menuItem, null, []);
      toast.success('Item added to cart');
     }
  }

  function handlePopUpAddToCart(item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[]): void {
    addToCart(item, selectedSize, selectedExtras);
    toast.success('Item added to cart');
    setShowPopUp(false);
  }

  return (

    <>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
          <img src={menuItem.image} alt="pizza" className="max-h-24 mx-auto" />
        </div>
        <h4 className="font-semibold text-xl my-3">
          {menuItem.name}
        </h4>
        <p className="text-gray-500 text-sm line-clamp-3">
          {menuItem.description}
        </p>
        <Button color="primary" className="mt-4 rounded-full px-8 py-2" onClick={() => handleAddToCartClick()}>
          {menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0
            ? `Add to Cart (from $${menuItem?.basePrice})`
            : `Add to Cart $${menuItem?.basePrice}`}
        </Button>
      </div>
      {showPopUp &&
        <MenuItemPopUp
        menuItem={menuItem}
        setShowPopUp={setShowPopUp}
        onAdd={(item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[])=>handlePopUpAddToCart(item, selectedSize, selectedExtras)} />}
    </>
  )
}

export default MenuItemCard