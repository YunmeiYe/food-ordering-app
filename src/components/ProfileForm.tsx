import React, { FormEvent,useState } from 'react'
import ImageUploader from './ImageUploader'
import { Avatar, Button, Checkbox } from '@nextui-org/react'
import { PencilIcon } from '@/icons/PencilIcon'
import User from '@/types/User'
import { useProfile } from './hooks/useProfile'

interface ProfileFormProps {
  user: User | null,
  onSave: (event: FormEvent<HTMLFormElement>, data: User) => void
}

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
  const [userName, setUserName] = useState(user?.name || '');
  const [userImage, setUserImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const { data: loggedInUserData} = useProfile();

  return (
    <div className='grid grid-cols-6 gap-4'>
      <div className='col-span-2'>
        <ImageUploader
          setImageLink={setUserImage}
          children={
            <div className='relative'>
              {userImage ? (
                <Avatar src={userImage!} className="w-[180px] h-[180px]" />
              ) : (
                <Avatar src='' showFallback className="w-[180px] h-[180px]" />
              )}
              <div className='bg-primary text-white rounded-full p-2 absolute right-7 bottom-6 hover:bg-red-400'>
                <PencilIcon className={'w-5'} />
              </div>
            </div>
          }
        />
      </div>
      <form className='col-span-4' onSubmit={(e) => onSave(e, {name: userName, image: userImage, phone, streetAddress, postalCode, city, state, country, isAdmin })}>
        <label> Full name</label>
        <input type="text" placeholder='Full name' value={userName ?? ''} onChange={e => setUserName(e.target.value)} className='input' />
        <label> Email</label>
        <input type="email" placeholder="Email" value={user?.email ?? ''} disabled className='input' />
        <label> Phone number</label>
        <input type="tel" placeholder='Phone number' value={phone ?? ''} onChange={e => setPhone(e.target.value)} className='input' />
        <label> Street address</label>
        <input type="text" placeholder='Street address' value={streetAddress ?? ''} onChange={e => setStreetAddress(e.target.value)} className='input' />
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label> City</label>
            <input type="text" placeholder='City' value={city ?? ''} onChange={e => setCity(e.target.value)} className='input' />
          </div>
          <div>
            <label> State</label>
            <input type="text" placeholder='State' value={state ?? ''} onChange={e => setState(e.target.value)} className='input' />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label> Country</label>
            <input type="text" placeholder='Country' value={country ?? ''} onChange={e => setCountry(e.target.value)} className='input' />
          </div>
          <div>
            <label> Postal code</label>
            <input type="text" placeholder='Postal code' value={postalCode ?? ''} onChange={e => setPostalCode(e.target.value)} className='input' />
          </div>
        </div>
        {loggedInUserData?.isAdmin && (
        <div className='my-2'>
        <Checkbox checked={isAdmin} defaultSelected={isAdmin} value={'1'} onChange={(e)=>setIsAdmin(e.target.checked)}>Admin</Checkbox>
        </div>
        )}
        <Button type='submit' className='mt-2' fullWidth >Save All Changes</Button>
      </form>
    </div>
  )
}

export default ProfileForm