import FlyingButton from 'react-flying-item'

const PopUpAddToCartButton = ({ price, image, onClick }) => {
  return (
    <div className='mt-4 sticky bottom-2'>
      <div onClick={onClick} className='flying-button-parent border-2 border-primary text-dark bg-primary hover:text-light hover:border-dark rounded-full transition-all whitespace-nowrap'>
        <FlyingButton src={image} targetLeft={'80%'}>
          Add to Cart <span className='font-semibold'>${price}</span> 
        </FlyingButton>
      </div>
    </div>
  )
}

export default PopUpAddToCartButton