'use client'
import ImageUploader from "@/components/common/ImageUploader"
import { UploadIcon } from "@/icons/UploadIcon"
import { Avatar, Button, Select, SelectItem, Tooltip } from "@nextui-org/react"
import { FormEvent, useEffect, useState } from "react"
import Image from "next/image";
import Category from "@/types/Category"
import MenuItem from "@/types/MenuItem"
import MenuItemAddOn from "@/types/MenuItemAddOn"
import MenuItemAddOnsInput from "./MenuItemAddOnsInput"
import ModalContainer from "../../common/ModalContainer"

interface MenuItemFormProps {
  menuItem: MenuItem | null;
  buttonText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>, data: MenuItem) => void;
  onDelete: () => void;
}

const MenuItemForm = ({ menuItem, buttonText, onSubmit, onDelete }: MenuItemFormProps) => {
  const [image, setImage] = useState<string>(menuItem?.image || '');
  const [name, setName] = useState<string>(menuItem?.name || '');
  const [description, setDescription] = useState<string>(menuItem?.description || '');
  const [category, setCategory] = useState<string>(menuItem?.category || '');
  const [basePrice, setBasePrice] = useState<string>(menuItem?.basePrice.toString() || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<MenuItemAddOn[]>(menuItem?.sizes || []);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState<MenuItemAddOn[]>(menuItem?.extraIngredientsPrices || []);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [])

  return (
    <div className='grid grid-cols-3 gap-6'>
      <div className={`relative h-[200px] ${image ? "" : "bg-blue-100 border-dashed border-3 border-blue-500 rounded-lg flex flex-col text-center justify-center"} `}>
        <label className="cursor-pointer h-full flex flex-col justify-center">
          {image ? (
            <Tooltip content={"Click to upload image"} placement="bottom">
              <span className="h-full relative">
                <Image src={image} alt={image} className="rounded-xl" fill />
              </span>
            </Tooltip>
          ) : (
            <>
              <UploadIcon className={"w-14 fill-blue-500 place-self-center"} />
              Upload Image
            </>
          )}
          <ImageUploader setImageLink={setImage}/>
        </label>
      </div>
      <form className='col-span-2' onSubmit={(e) => onSubmit(e, { image, name, description, category, basePrice, sizes, extraIngredientsPrices })}>
        <label> Item Name </label>
        <input type="text" placeholder='Item name' value={name ?? ''} onChange={e => setName(e.target.value)} className="input" />
        <label> Description</label>
        <textarea rows={5} placeholder="Description" value={description ?? ''} onChange={e => setDescription(e.target.value)} className="input" />
        <Select label="Select a category" size="sm" radius="lg" className="light my-2"
          value={category ?? ''}
          onChange={e => setCategory(e.target.value)}>
          {categories.map(c =>
            <SelectItem
              key={c._id}
              value={c._id}
              startContent={
                <Avatar src={c.image} alt={c.name} radius="md" className="w-10 h-auto" />}
            >
              {c.name}
            </SelectItem>
          )}
        </Select>
        <label> Base Price</label>
        <input type="number" placeholder='Base Price' value={basePrice ?? ''} onChange={e => setBasePrice(e.target.value)} className="input" />
        <MenuItemAddOnsInput addOnName={"Sizes"} addLabel={"Add item size"} props={sizes} setProps={setSizes} />
        <MenuItemAddOnsInput addOnName={"Extra ingredients"} addLabel={"Add ingredients price"} props={extraIngredientsPrices} setProps={setExtraIngredientsPrices} />
        <Button type='submit' className='mt-4 font-semibold hover:text-white' color="primary" fullWidth >{buttonText}</Button>
        <Button color="danger" variant='flat' className='mt-3 border-2 border-danger hover:text-white' fullWidth onClick={() => setShowConfirm(true)}>Delete this item</Button>
      </form>
      <ModalContainer
        isOpen={showConfirm}
        title={"Delete this item?"}
        content={"Are you sure you want to delete this item?"}
        confirmText={"Yes, delete it"}
        onConfirm={() => { onDelete(), setShowConfirm(false) }}
        closeText="Cancel"
        onClose={() => setShowConfirm(false)}
      />
    </div>
  )
}

export default MenuItemForm