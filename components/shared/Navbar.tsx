import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'

const Navbar = () => {
  return (
    <div className='flex items-center pr-8 pt-2'>
      <MobileSidebar />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar