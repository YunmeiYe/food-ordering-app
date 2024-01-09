'use client'
import ProfileForm from '@/components/ProfileForm';
import UserTabs from '@/components/UserTabs';
import User from '@/types/User';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/profile`).then(res => res.json()).then(data => {
        setUser(data)
        setIsAdmin(data.isAdmin);
        setProfileFetched(true);
      })
    };
  }, [session, status])

  if (status === 'loading' || !profileFetched && session) {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>, data: User) {
    event.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
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

  return (
    <section className="my-8">
      <UserTabs admin={isAdmin} />
      <div className="block max-w-2xl mx-auto mt-12">
        <ProfileForm user={user} onSave={(event, data) => handleProfileUpdate(event, data)} />
      </div>
    </section>
  )
}

export default ProfilePage