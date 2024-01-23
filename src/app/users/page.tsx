'use client'
import UserTabs from '@/components/layout/UserTabs'
import UsersTable from '@/components/features/users/UsersTable'
import { useProfile } from '@/components/hooks/useProfile'
import UserProfile from '@/types/UserProfile'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Loader from '@/components/common/Loader'

const UsersPage = () => {
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => setUsers(data));
  }, [])

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  if (profileData && !isAdmin) {
    redirect('/');
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""}/>
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin} />
          <div className="max-w-4xl mx-auto mt-12">
            <UsersTable users={users} />
          </div>
        </>}
    </section>
  )
}

export default UsersPage