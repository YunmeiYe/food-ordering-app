'use client'
import ProfileForm from '@/components/common/form/ProfileForm'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/hooks/useProfile'
import UserProfile from '@/types/UserProfile'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const EditUserPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile()
  const [user, setUser] = useState<UserProfile | null>(null);
  const { id } = useParams()

  function fetchUser() {
    fetch(`/api/users`)
      .then(res => res.json())
      .then(users => setUser(users.find((u: UserProfile) => u._id === id)))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>, data: UserProfile) {
    event.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const reqData = data;
      reqData._id = id as string;
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(reqData),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());
      if (response.error) {
        reject();
      } else {
        fetchUser();
        resolve(response);
      }
    });

    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "User info saved!",
      error: "Error saving user info"
    });
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData.isAdmin &&
        <>
          <UserTabs admin={profileData.isAdmin} />
          <Breadcrumbs size='lg' className="mt-12">
            <BreadcrumbItem href='/users'>Users</BreadcrumbItem>
            <BreadcrumbItem>Edit </BreadcrumbItem>
          </Breadcrumbs>
          <div className="max-w-2xl mx-auto mt-12">
            {user &&
              <ProfileForm user={user} onSave={(event, data) => handleProfileUpdate(event, data)} />
            }
          </div>
        </>}
    </section>
  )
}

export default EditUserPage