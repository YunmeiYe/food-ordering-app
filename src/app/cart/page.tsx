'use client'
import AddressInputs from '@/components/AddressInputs'
import { useProfile } from '@/components/hooks/useProfile'
import { CartContext, calCartProductPrice } from '@/components/providers'
import { CartIcon } from '@/icons/CartIcon'
import { CreditCardIcon } from '@/icons/CreditCardIcon'
import { TrashIcon } from '@/icons/TrashIcon'
import { Button, Image, Tooltip } from '@nextui-org/react'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData) {
      const { phone, streetAddress, city, state, country, postalCode } = profileData;
      setAddress({ phone, streetAddress, city, state, country, postalCode });
    }
  }, [profileData])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 🙁')
      }
    }
  }, [])

  let subtotal = 0;
  cartProducts.forEach(cartProduct => {
    subtotal += calCartProductPrice(cartProduct) as number;
  });

  function handleAddressChange(propName: string, value: string): void {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckOut(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const promise = new Promise<void>((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, cartProducts }),
      }).then(async response => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong, please try again later.'
    });
  }

  return (
    <section className='my-8'>
      <div className='grid grid-cols-2 mt-16 gap-12'>
        <div>
          <div className='border-b-1 flex items-center text-lg font-semibold'><CartIcon className={'w-10 stroke-gray-700 mx-4 my-2'} />My Cart</div>
          {cartProducts.length > 0
            ? (
              <div>
                {cartProducts && cartProducts.map((product, index) => (
                  <div key={index} className='grid grid-cols-8 items-center gap-4 border-b py-3'>
                    <div className='col-span-2'>
                      <Image src={product.menuItem.image} alt={product.menuItem.name} />
                    </div>
                    <div className='col-span-4 ml-4'>
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
                    <div className='text-lg text-right font-semibold'>
                      ${(calCartProductPrice(product) as number).toFixed(2)}
                    </div>
                    <Tooltip content='Remove'>
                      <div className='ml-6 cursor-pointer' onClick={() => removeCartProduct(index)}>
                        <TrashIcon className={'w-6'} />
                      </div>
                    </Tooltip>
                  </div>
                ))}
                <div className='grid grid-cols-8 items-center gap-4 border-b py-3'>
                  <div className='col-span-6 flex flex-col gap-4 pl-4'>
                    <span className='text-lg font-semibold'>Subtotal:</span>
                    <span className='text-gray-500'>Delivery fee:</span>
                  </div>
                  <div className='col-span-1 flex flex-col gap-4 justify-items-end'>
                    <span className='font-semibold text-lg text-right'>${subtotal.toFixed(2)}</span>
                    <span className='text-gray-500 text-right'>$5.00</span>
                  </div>
                </div>
                <div className='grid grid-cols-8 items-center gap-4 py-3'>
                  <div className='col-span-6 pl-4'>
                    <span className='font-semibold text-lg'>Total:</span>
                  </div>
                  <div className='col-span-2'>
                    <span className='font-semibold text-xl'>${(subtotal + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>No product in your shopping cart</div>
            )
          }
        </div>
        <div>
          <div className='flex items-center text-lg font-semibold'>
            <CreditCardIcon className={'w-10 stroke-gray-700 mx-4 my-2'} />
            Check Out
          </div>
          <div className='bg-gray-100 rounded-xl p-4'>
            <form className='flex flex-col gap-3 mt-3' onSubmit={proceedToCheckOut}>
              <div>
                <AddressInputs
                  addressProps={address}
                  setAddressProps={(propName: string, value: string) => handleAddressChange(propName, value)} />
              </div>
              <Button type='submit' color='primary' fullWidth>Pay ${(subtotal + 5).toFixed(2)}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPage