import React from 'react'

interface AddressinputsProps {
  addressProps: any,
  setAddressProps: (propName: string, value: string) => void,
  disabled: boolean
}

const Addressinputs = ({ addressProps, setAddressProps, disabled }: AddressinputsProps) => {
  const { phone, streetAddress, city, state, country, postalCode } = addressProps;
  return (
    <>
      <label> Phone number</label>
      <input type="tel" placeholder='Phone number' disabled={disabled} value={phone ?? ''} onChange={e => setAddressProps('phone', e.target.value)} className='input' />
      <label> Street address</label>
      <input type="text" placeholder='Street address' disabled={disabled} value={streetAddress ?? ''} onChange={e => setAddressProps('streetAddress', e.target.value)} className='input' />
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label> City</label>
          <input type="text" placeholder='City' disabled={disabled} value={city ?? ''} onChange={e => setAddressProps('city', e.target.value)} className='input' />
        </div>
        <div>
          <label> State</label>
          <input type="text" placeholder='State' disabled={disabled} value={state ?? ''} onChange={e => setAddressProps('state', e.target.value)} className='input' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label> Country</label>
          <input type="text" placeholder='Country' disabled={disabled} value={country ?? ''} onChange={e => setAddressProps('country', e.target.value)} className='input' />
        </div>
        <div>
          <label> Postal code</label>
          <input type="text" placeholder='Postal code' disabled={disabled} value={postalCode ?? ''} onChange={e => setAddressProps('postalCode', e.target.value)} className='input' />
        </div>
      </div>
    </>
  )
}

export default Addressinputs