import React from 'react'
interface SlideBackgroundProps {
  bgImage: string
  children: React.ReactNode
}

const SlideBackground = ({ bgImage, children }: SlideBackgroundProps) => {
  return (
    <div className="hs-carousel-slide relative bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {children}
    </div>
  )
}

export default SlideBackground