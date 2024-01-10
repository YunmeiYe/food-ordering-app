import FlyingButton from 'react-flying-item'

const PopUpAddToCartButton = ({ price, image, onClick }) => {
  return (
    <div className='flying-button-parent mt-4 sticky bottom-2'>
    <div onClick={onClick}>
      <FlyingButton src={image} targetLeft={'75%'}>
      Add to Cart ${price}
      </FlyingButton>
    </div>
  </div>
  )
}

export default PopUpAddToCartButton