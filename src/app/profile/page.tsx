'use client'
import { useProfile } from '@/components/hooks/useProfile';
import ProfileForm from '@/components/common/form/ProfileForm';
import UserTabs from '@/components/layout/UserTabs';
import UserProfile from '@/types/UserProfile';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { FormEvent } from 'react'
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const { data: profileData, loading } = useProfile();

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""}/>
  }

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>, data: UserProfile) {
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
    <section className="pt-10 pb-20">
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin} className={profileData.isAdmin ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"} />
          <div className="mt-16 max-w-2xl mx-auto">
            <ProfileForm user={profileData} onSave={(event, data) => handleProfileUpdate(event, data)} />
          </div>
        </>
      }
    </section>
  )
}

export default ProfilePage