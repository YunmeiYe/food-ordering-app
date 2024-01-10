import { Button } from '@nextui-org/react'
import FlyingButton from 'react-flying-item'

const AddToCartButton = ({ hasSizesOrExtras, basePrice, image, onClick }) => {
  if (!hasSizesOrExtras) {
    return (
      <div className='flying-button-parent mt-4 px-8'>
        <div onClick={onClick}>
          <FlyingButton src={image} targetLeft={'75%'}>
            Add to Cart
          </FlyingButton>
        </div>
      </div>
    )
  }

  return (
    <Button color="primary" className="mt-4 rounded-full px-8 py-2" onClick={onClick}>
      {hasSizesOrExtras && `Add to Cart (from $${basePrice})`}
    </Button>
  )
}

export default AddToCartButton