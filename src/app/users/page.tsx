'use client'
import UserTabs from '@/components/layout/UserTabs'
import UsersTable from '@/components/features/users/UsersTable'
import { useProfile } from '@/components/hooks/useProfile'
import UserProfile from '@/types/UserProfile'
import React, { useEffect, useState } from 'react'

const UsersPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile()
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => setUsers(data));
  }, [])

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData.isAdmin &&
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