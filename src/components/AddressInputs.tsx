import React from 'react'

interface AddressInputsProps {
  addressProps: any,
  setAddressProps: (propName: string, value: string) => void
}

const AddressInputs = ({ addressProps, setAddressProps }: AddressInputsProps) => {
  const { phone, streetAddress, city, state, country, postalCode } = addressProps;
  return (
    <>
      <label> Phone number</label>
      <input type="tel" placeholder='Phone number' value={phone ?? ''} onChange={e => setAddressProps('phone', e.target.value)} className='input' />
      <label> Street address</label>
      <input type="text" placeholder='Street address' value={streetAddress ?? ''} onChange={e => setAddressProps('streetAddress', e.target.value)} className='input' />
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label> City</label>
          <input type="text" placeholder='City' value={city ?? ''} onChange={e => setAddressProps('city', e.target.value)} className='input' />
        </div>
        <div>
          <label> State</label>
          <input type="text" placeholder='State' value={state ?? ''} onChange={e => setAddressProps('state', e.target.value)} className='input' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label> Country</label>
          <input type="text" placeholder='Country' value={country ?? ''} onChange={e => setAddressProps('country', e.target.value)} className='input' />
        </div>
        <div>
          <label> Postal code</label>
          <input type="text" placeholder='Postal code' value={postalCode ?? ''} onChange={e => setAddressProps('postalCode', e.target.value)} className='input' />
        </div>
      </div>
    </>
  )
}

export default AddressInputs