'use client';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItemCard from '@/components/menu/MenuItemCard';
import Category from '@/types/Category';
import MenuItem from '@/types/MenuItem';
import React, { useEffect, useState } from 'react';

const MenuPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => { setCategories(data) });
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => { setMenuItems(data) });
  }, [])

  return (
    <section className='my-8'>
      {categories && categories.map(category => (
        <div key={category._id}>
          <div>
            <SectionHeaders subHeader={''} mainHeader={category.name} />
          </div>
          <div className='grid grid-cols-3 gap-4 mt-6 mb-12'>
            {menuItems && menuItems.filter(item => item.category === category._id).map(item => (
              <MenuItemCard key={item._id} menuItem={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default MenuPage