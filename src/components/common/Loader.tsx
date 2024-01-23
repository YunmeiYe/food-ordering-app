import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loader = ({className}:{className:string}) => {
  return (
    <Spinner className={`w-full h-screen ${className}`} label="Loading..." color="warning" size="lg"></Spinner>
  )
}

export default Loader