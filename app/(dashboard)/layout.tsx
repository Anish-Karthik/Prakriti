import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const DashBoardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full relative'>
      {/* desktop view */}
      <div className='hidden h-full md:flex md:flex-col md:fixed md:w-72 inset-y-0 z-[80] bg-gray-900 mr-2' >
        <div>
          <Sidebar />
        </div>
      </div>
      <main className='md:pl-72 h-full max-h-[90vh]'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashBoardLayout