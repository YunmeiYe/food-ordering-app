import React from 'react'

interface DecoDividerProps {
  className?: string
}

const DecoDivider = ({className}:DecoDividerProps) => {
  return (
    <div className={`container max-w-sm text-center flex justify-center items-center ${className}`}>
      <hr className='bg-primary h-[1px] w-10 border-none'/>
      <div className='h-2 w-2 bg-primary ml-3 rotate-45'></div>
      <div className='h-4 w-4 bg-primary ml-3 rotate-45'></div>
      <div className='h-2 w-2 bg-primary ml-3 rotate-45'></div>
      <hr className='bg-primary h-[1px] w-10 border-none ml-3' />
    </div>
  )
}

export default DecoDivider