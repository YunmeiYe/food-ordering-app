import MenuItem from '@/types/MenuItem'
import MenuItemAddOn from '@/types/MenuItemAddOn'
import { Button, Image } from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import { calCartProductPrice } from '../../../util/ContextProvider'

interface MenuItemPopUpProps {
  menuItem: MenuItem,
  setShowPopUp: (showPopUp: boolean) => void,
  onAdd: (item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[]) => void
}

const MenuItemPopUp = ({ menuItem, setShowPopUp, onAdd }: MenuItemPopUpProps) => {
  const [selectedSize, setSelectedSize] = useState(menuItem.sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemAddOn[]>([]);
  const addToCartPrice = calCartProductPrice({ menuItem, selectedSize, selectedExtras });

  function handleSelectExtras(e: ChangeEvent<HTMLInputElement>, extraIngredient: MenuItemAddOn): void {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraIngredient]);
    } else {
      setSelectedExtras(prev => { return prev.filter(item => item.name !== extraIngredient.name) });
    }
  }

  return (
    <div
      onClick={() => setShowPopUp(false)}
      className='fixed inset-0 top-20 bg-black/80 flex items-center justify-center z-999 light'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white p-2 rounded-2xl max-w-md '>
        <div className='overflow-y-scroll p-2' style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className='w-full flex flex-col items-center'>
            <Image src={menuItem.image} alt={menuItem.name} width={300} height={200} />
          </div>
          <h2 className='font-bold text-center my-3 text-primary'>{menuItem.name}</h2>
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
                  {size.name} ${menuItem.basePrice as string + size.price}
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
          <div onClick={() => onAdd(menuItem, selectedSize, selectedExtras)}>
          </div>
          <button
            className='mt-4 sticky bottom-2 w-full border-2 px-4 py-2 border-primary text-dark bg-primary
             hover:text-light hover:border-dark rounded-full transition-all whitespace-nowrap'
             onClick={() => onAdd(menuItem, selectedSize, selectedExtras)}
          >
            Add to Cart <span className='font-semibold'>${addToCartPrice}</span>
          </button>
          <Button color='danger' variant='flat' radius='full' className='my-2' fullWidth onClick={() => setShowPopUp(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default MenuItemPopUp