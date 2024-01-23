import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { TrashIcon } from '@/icons/TrashIcon';
import MenuItemProp from '@/types/MenuItemAddOn';
import { Button } from '@nextui-org/react';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface MenuItemAddOnsInputProps {
  addOnName: string;
  addLabel: string;
  props: MenuItemProp[];
  setProps: Dispatch<SetStateAction<MenuItemProp[]>>;
}

const MenuItemAddOnsInput = ({ addOnName, addLabel, props, setProps }: MenuItemAddOnsInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function addSize() {
    setProps(oldProps => {
      return [...oldProps, { name: '', price: '0' }];
    });
  }

  function editSize(e: ChangeEvent<HTMLInputElement>, index: number, prop: string) {
    const newValue = e.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      if (prop === 'name') {
        newSizes[index].name = newValue;
      }
      else if (prop === 'price') {
        newSizes[index].price = newValue;
      }
      return newSizes;
    })
  }

  function removeSize(indexToRemove: number) {
    setProps(prev => prev.filter((value, index) => index !== indexToRemove))
  }

  return (
    <div className="bg-light rounded-xl p-2 mb-2">
      <Button
        className='bg-transparent p-0 justify-start text-dark'
        disableAnimation={true}
        startContent={isOpen ? <ChevronUpIcon className={'w-6'} /> : <ChevronDownIcon className={'w-6'} />}
        endContent={<span>({props.length})</span>}
        onClick={() => setIsOpen(!isOpen)}
      >
        {addOnName}
      </Button>
      <div className={isOpen ? "block" : "hidden"}>
        {props.length > 0 && props.map((size, index) => (
          <div className="flex gap-2 items-center text-gray-700" key={index}>
            <div>
              <label className='text-gray-700'>Name</label>
              <input type="text" required placeholder="Size name" value={size.name} onChange={(e) => editSize(e, index, 'name')} className='input' />
            </div>
            <div>
              <label className='text-gray-700'>Extra price</label>
              <input type="number" placeholder="Extra price" value={size.price} onChange={(e) => editSize(e, index, 'price')} className='input' />
            </div>
            <div className="mt-3 cursor-pointer" onClick={() => removeSize(index)}>
              <TrashIcon className={"w-6"} />
            </div>
          </div>
        ))}
        <Button className="bg-transparent text-gray-700 border-2 border-gray-700 mb-1" fullWidth onClick={addSize} startContent={<PlusIcon className={"w-6"} />}>
          {addLabel}
        </Button>
      </div>
    </div>
  )
}

export default MenuItemAddOnsInput