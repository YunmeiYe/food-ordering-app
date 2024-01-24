'use client';
import Loader from '@/components/common/Loader';
import CategoryTag from '@/components/features/categories/CategoryTag';
import MenuItemCard from '@/components/features/menuItems/MenuItemCard';
import SectionHeader from '@/components/layout/SectionHeader';
import Category from '@/types/Category';
import MenuItem from '@/types/MenuItem';
import React, { useEffect, useState } from 'react';

const MenuPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true)

  const filteredCategories = categories.filter(category => category.name.includes(tag))

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then((data: Category[]) => { setCategories(data), setTag(data[0].name) });
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => { setMenuItems(data) });
    setLoading(false);
  }, [])

  if (loading) {
    return <Loader className={''} />
  }

  return (
    <section className="py-12">
      {categories && menuItems &&
        <>
          <SectionHeader
            header={'Our Menu'}
            description={'From classic favorites to innovative creations, our hot pizza meals promise a delightful symphony of flavors that will leave you craving for more.'}
          />
          <div className='flex gap-3 justify-center mb-12'>
            {categories.map(category => (
              <CategoryTag
                key={category._id}
                name={category.name}
                onClick={(name: string) => setTag(name)} isSelected={tag === category.name}
              />
            ))}
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {filteredCategories.map(category => (
              menuItems.filter(item => item.category === category._id).map((item, index) => (
                <div className='p-4' key={item._id}>
                  <MenuItemCard menuItem={item} />
                </div>
              ))
            ))}
          </div>
        </>
      }
    </section>
  )
}

export default MenuPage