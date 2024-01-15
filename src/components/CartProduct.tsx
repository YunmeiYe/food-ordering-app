import { TrashIcon } from '@/icons/TrashIcon'
import CartProduct from '@/types/CartProduct'
import { Image, Tooltip } from '@nextui-org/react'

interface CartProductProps {
  product: CartProduct,
  onRemove?: () => void,
}

const CartProduct = ({ product, onRemove }: CartProductProps) => {
  return (
    <div className='grid grid-cols-8 gap-4 border-b py-1'>
      <div className='col-span-2'>
        <Image src={product.menuItem.image} alt={product.menuItem.name} />
      </div>
      <div className='col-span-3 px-4'>
        <h3 className='font-semibold'>{product.menuItem.name}</h3>
        {product.selectedSize && (
          <div className='text-sm'>
            Size: <span>{product.selectedSize.name}</span>
          </div>
        )}
        {product.selectedExtras.length > 0 && (
          <div className='text-sm text-gray-500'>
            {product.selectedExtras.map((extra, index) => (
              <div key={index}>{extra.name} ${((extra.price) as number).toFixed(2)}</div>
            ))}
          </div>
        )}
      </div>
      <div className='items-start text-center'>
        <h3 className='font-semibold'>Quantity</h3>
        <p>1</p>
      </div>
      <div className='text-right font-semibold'>
        ${(product.menuItem.basePrice as number).toFixed(2)}
      </div>
      {!!onRemove && (
        <Tooltip content='Remove'>
          <div className='ml-6 cursor-pointer' onClick={onRemove}>
            <TrashIcon className={'w-6'} />
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default CartProduct