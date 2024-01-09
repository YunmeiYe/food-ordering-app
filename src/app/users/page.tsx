'use client'
import UserTabs from '@/components/UserTabs'
import UsersTable from '@/components/UsersTable'
import { useProfile } from '@/components/hooks/useProfile'
import User from '@/types/User'
import React, { useEffect, useState } from 'react'

const UsersPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile()
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => setUsers(data));
  },[])

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  return (
    <section className="my-8">
      <UserTabs admin={profileData.isAdmin} />
      <div className="block max-w-2xl mx-auto mt-12">
        <UsersTable users={users} />
      </div>
    </section>
  )
}

export default UsersPage