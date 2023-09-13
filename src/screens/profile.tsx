import React from 'react'
import User from '../features/user/user'
import Login from '../features/user/login'

const Profile: React.FC = () => {
  return (
    <main>
      <User />
      <Login />
    </main>
  )
}

export default Profile
