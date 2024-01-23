'use client'
import React, { useEffect, useState } from 'react'
import MenuItem from '@/types/MenuItem'
import HomeMenuItemCard from './HomeMenuItemCard'
import SectionHeader from './SectionHeader'
import { SectionProps } from '@/types/SectionProps'

const HomeMenu = ({ className }: SectionProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetch("/api/menu-items")
      .then(res => res.json())
      .then(menuItems => setMenuItems(menuItems.slice(0,6)))
  }, [])

  return (
    <section className={className}>
      <SectionHeader
        header={'Hot Pizza Meals'}
        description={'From classic favorites to innovative creations, our hot pizza meals promise a delightful symphony of flavors that will leave you craving for more.'}
      />
      <div className='grid md:grid-cols-3 md:gap-0 grid-cols-1 gap-4'>
        {menuItems && menuItems.map((menuItem, index) => (
          <HomeMenuItemCard key={menuItem._id} menuItem={menuItem} index={index} />
        ))}
      </div>
    </section>
  )
}

export default HomeMenu