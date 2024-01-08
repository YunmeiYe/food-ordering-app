import MenuItemProp from "./MenuItemProp";

type MenuItem = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string | number;
  sizes: MenuItemProp[];
  extraIngredientsPrices: MenuItemProp[];
}

export default MenuItem;