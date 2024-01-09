'use client'
import Image from "next/image"
import MenuItemCard from "./menu/MenuItemCard"
import SectionHeaders from "./layout/SectionHeaders"
import { useEffect, useState } from "react"
import MenuItem from "@/types/MenuItem"

const HomeMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetch("/api/menu-items")
    .then(res => res.json())
    .then(menuItems => setMenuItems(menuItems))
  }, [])
  
  return (
    <section>
      <div className="absolute left-0 right-0">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image src={"/assets/salad-left.png"} alt={"salad"} width={109} height={189} style={{ width: 109, height: 'auto' }} />
        </div>
        <div className="absolute right-0 -top-[100px] -z-10">
          <Image src={"/assets/salad-right.png"} alt={"salad"} width={107} height={195} style={{ width: 107, height: 'auto' }} />
        </div>
      </div>
      <SectionHeaders subHeader={"check out"} mainHeader={"Menu"} />
      <div className="grid grid-cols-3 gap-4">
        {menuItems && menuItems.map(menuItem => (
          <MenuItemCard key={menuItem._id} menuItem={menuItem}/>
        ))}
      </div>
    </section>
  )
}

export default HomeMenu