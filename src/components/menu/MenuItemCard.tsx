import { useContext, useState } from "react";
import { CartContext } from "../providers";
import MenuItem from "@/types/MenuItem";
import MenuItemPopUp from "./MenuItemPopUp";
import MenuItemAddOn from "@/types/MenuItemAddOn";
import AddToCartButton from "../AddToCartButton";

interface MenuItemProps {
  menuItem: MenuItem;
}

const MenuItemCard = ({ menuItem }: MenuItemProps) => {
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const hasSizesOrExtras = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;

  function handleAddToCartClick() {
    const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    if (hasOptions) {
      setShowPopUp(true);
    } else {
      addToCart(menuItem, null, []);
     }
  }

  async function handlePopUpAddToCart(item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[]): Promise<void> {
    addToCart(item, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 800));
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
        <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} basePrice={menuItem?.basePrice} onClick={handleAddToCartClick} image={menuItem.image}/>
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