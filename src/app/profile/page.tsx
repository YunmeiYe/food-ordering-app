'use client'
import FileUploadModal from '@/components/layout/FileUploadModal';
import { Pencil } from '@/icons/Pencil';
import { Avatar, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session, status, update } = useSession();
  const [userName, setUserName] = useState('');
  const [userImage, setuserImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(res => res.json()).then(data => {
        setUserName(data.name);
        setuserImage(data.image);
        setPhone(data.phone);
        setStreetAddress(data.streetAddress);
        setCity(data.city);
        setState(data.state);
        setPostalCode(data.postalCode);
        setCountry(data.country);
      })
    };
  }, [session, status])

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: userName,
          image: userImage,
          phone: phone,
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        updateSessionUserName(userName);
        resolve(response);
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving profile"
    });
  }

  async function updateSessionUserName(newName: string) {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: newName
      }
    })
  }

  async function updateSessionImage(newImage: string) {
    await update({
      ...session,
      user: {
        ...session?.user,
        image: newImage
      }
    })
  }

  return (
    <section className="my-8">
      <h1 className="text-center text-primary text-4xl mt-4">
        Profile
      </h1>
      <div className="block max-w-md mx-auto mt-8">
        <div className='grid grid-cols-6 gap-4'>
          <div className='col-span-2'>
            <div className='cursor-pointer relative' onClick={() => setOpenModal(!openModal)}>
              {userImage ? (
                <Avatar src={userImage!} className="w-[120px] h-[120px]" />
              ) : (
                <Avatar className="w-[120px] h-[120px]" />
              )}
              <div className='bg-primary text-white rounded-full p-2 absolute right-3 bottom-3 hover:bg-red-400'>
                <Pencil className={'w-4'} />
              </div>
            </div>
          </div>
          <form className='col-span-4' onSubmit={handleProfileUpdate}>
            <label> Full name</label>
            <input type="text" placeholder='Full name' value={userName ?? ''} onChange={e => setUserName(e.target.value)} />
            <label> Email</label>
            <input type="email" placeholder="Email" value={session?.user?.email!} disabled />
            <label> Phone number</label>
            <input type="tel" placeholder='Phone number' value={phone ?? ''} onChange={e => setPhone(e.target.value)} />
            <label> Street address</label>
            <input type="text" placeholder='Street address' value={streetAddress ?? ''} onChange={e => setStreetAddress(e.target.value)} />
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label> City</label>
                <input type="text" placeholder='City' value={city ?? ''} onChange={e => setCity(e.target.value)} />
              </div>
              <div>
                <label> State</label>
                <input type="text" placeholder='State' value={state ?? ''} onChange={e => setState(e.target.value)} />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label> Country</label>
                <input type="text" placeholder='Country' value={country ?? ''} onChange={e => setCountry(e.target.value)} />
              </div>
              <div>
                <label> Postal code</label>
                <input type="text" placeholder='Postal code' value={postalCode ?? ''} onChange={e => setPostalCode(e.target.value)} />
              </div>
            </div>
            <Button type='submit' className='font-semibold text-medium' fullWidth >Save All Changes</Button>
          </form>
        </div>
      </div>
      <FileUploadModal isOpen={openModal} onConfirm={() => setOpenModal(false)} onUpdate={(imageLink: string) => { updateSessionImage(imageLink) }} />
    </section>
  )
}

export default ProfilePage