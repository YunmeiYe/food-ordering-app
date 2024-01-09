import MenuItem from '@/types/MenuItem'
import MenuItemAddOn from '@/types/MenuItemAddOn'
import { Button, Image } from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'

interface MenuItemPopUpProps {
  menuItem: MenuItem,
  setShowPopUp: (showPopUp: boolean) => void,
  onAdd: (item: MenuItem, selectedSize:MenuItemAddOn, selectedExtras: MenuItemAddOn[]) => void
}

const MenuItemPopUp = ({ menuItem,setShowPopUp,onAdd }: MenuItemPopUpProps) => {
  const [selectedSize, setSelectedSize] = useState(menuItem.sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemAddOn[]>([]);

  function handleSelectExtras(e: ChangeEvent<HTMLInputElement>, extraIngredient: MenuItemAddOn): void {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraIngredient]);
    } else {
      setSelectedExtras(prev => { return prev.filter(item => item.name !== extraIngredient.name) });
    }
  }

  let selectedPrice = menuItem.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <div
      onClick={()=>setShowPopUp(false)}
      className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
      <div
        onClick={(e)=> e.stopPropagation()}
        className='bg-white p-2 rounded-lg max-w-md'>
        <div className='overflow-y-scroll p-2' style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <div className='w-full flex flex-col items-center'>
            <Image src={menuItem.image} alt={menuItem.name} width={300} height={200} />
          </div>
          <h2 className='text-lg font-bold text-center mb-2'>{menuItem.name}</h2>
          <p className='text-center text-sm text-gray-500 mb-4'>{menuItem.description}</p>
          {menuItem.sizes.length > 0 && (
            <div className="py-2">
              <h3 className="text-center text-gray-700">Select your size</h3>
              {menuItem.sizes.map(size => (
                <label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                  <input
                    type='radio'
                    name='size'
                    checked={selectedSize?.name === size.name}
                    onChange={() => setSelectedSize(size)}
                  />
                  {size.name} ${menuItem.basePrice + size.price}
                </label>
              ))}
            </div>
          )}
          {menuItem.extraIngredientsPrices.length > 0 && (
            <div className="py-2">
              <h3 className="text-center text-gray-700">Any extras?</h3>
              {menuItem.extraIngredientsPrices.map(extraIngredient => (
                <label key={extraIngredient._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                  <input
                    type='checkbox'
                    name={extraIngredient.name}
                    checked={selectedExtras.map(e => e._id).includes(extraIngredient._id)}
                    onChange={(e) => handleSelectExtras(e, extraIngredient)}
                  />
                  {extraIngredient.name} ${extraIngredient.price}
                </label>
              ))}
            </div>
          )}
          <Button color='primary' className='sticky bottom-2 mt-4' fullWidth onClick={()=>onAdd(menuItem, selectedSize, selectedExtras)}>Add to Cart ${selectedPrice}</Button>
          <Button className='bg-white border border-gray-400 my-2' fullWidth onClick={()=> setShowPopUp(false)}>Cancel</Button>
          </div>
      </div>
    </div>
  )
}

export default MenuItemPopUp