import React from 'react'
import DecoDivider from '../common/DecoDivider'

interface SectionHeaderProps {
  header: string
  description: string
}

const SectionHeader = ({ header, description }: SectionHeaderProps) => {
  return (
    <div className='container max-w-4xl text-center mb-20'>
      <h1 className='mb-4'>{header} </h1>
      <DecoDivider className='mb-4' />
      <p className='text-gray-400'>{description}</p>
    </div>
  )
}

export default SectionHeader