import HomeMenu from '@/components/layout/HomeMenu'
import ServicesSection from '@/components/layout/ServicesSection'
import React from 'react'

const ServicesPage = () => {
  return (
    <div>
      <ServicesSection />
      <HomeMenu className={'py-24'} />
    </div>
  )
}

export default ServicesPage