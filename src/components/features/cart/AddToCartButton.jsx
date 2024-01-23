import FlyingButton from 'react-flying-item'

const AddToCartButton = ({ hasSizesOrExtras, image, onClick }) => {
  return (
    <div onClick={onClick} className='flying-button-parent border-2 bg-dark hover:bg-primary hover:text-dark rounded-full transition-all whitespace-nowrap'>
      {hasSizesOrExtras
        ? (<button onClick={onClick}>Add to Cart</button>)
        : (<FlyingButton src={image} targetLeft={'80%'}>Add to Cart</FlyingButton>)
      }
    </div>
  )
}

export default AddToCartButton