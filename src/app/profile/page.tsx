'use client'
import FileUploadModal from '@/components/layout/FileUploadModal';
import ModalContainer from '@/components/layout/ModalContainer';
import Pencil from '@/icons/Pencil';
import { Avatar, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'

const ProfilePage = () => {
  const { data: session, status, update} = useSession();
  const [userName, setUserName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userImage, setuserImage] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.user?.name ?? '')
      setuserImage(session.user?.image!)
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
    setSavingProfile(true);

    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify({ name: userName, image:userImage }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      updateSessionUserName(userName);
      setProfileSaved(true);
    } else {
      setError(true);
    }

    setSavingProfile(false);
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
          <div className='flex flex-col items-center gap-2'>
            {userImage ? (
              <Avatar src={userImage!} className="w-20 h-20 text-large" />
            ) : (
              <Avatar className="w-20 h-20 text-large" />
            )}
              <Button
                onClick={()=>setOpenModal(!openModal)}
                className='bg-white border border-gray-300 font-semibold text-medium text-gray-700'>
              <Pencil className={'w-5'} />
              Edit
              </Button>
          </div>
          </div>
          <form className='col-span-4 text-center' onSubmit={handleProfileUpdate}>
            <input type="text" placeholder='Full name' name='name' value={userName} onChange={(e)=> setUserName(e.target.value)}/>
            <input type="email" placeholder="Email"value={session?.user?.email!} disabled />
            <Button type='submit' className='font-semibold text-medium' fullWidth isLoading={savingProfile}>Save All Changes</Button>
          </form>
        </div>
      </div>
      <ModalContainer isOpen={profileSaved} onConfirm={() => setProfileSaved(false)} title={"Profile Saved!"} content={"Your profile has been updated successfully."}/>
      <ModalContainer isOpen={error} onConfirm={() => setError(false)} title={"Error"} content={"Oops, something went wrong. Please try again later."} />
      <FileUploadModal isOpen={openModal} onConfirm={() => setOpenModal(false)} onUpdate={(imageLink: string)=>{updateSessionImage(imageLink)}} />
    </section>
  )
}

export default ProfilePage