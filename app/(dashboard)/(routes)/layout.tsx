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
      <div className='hidden h-full lg:flex lg:flex-col lg:fixed lg:w-72 inset-y-0 z-[80] bg-gray-900 mr-2' >
        <div>
          <Sidebar />
        </div>
      </div>
      <main className='lg:pl-[8rem] h-full max-h-[90vh]'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashBoardLayout