"use client"
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={cn('flex items-center pr-8 pt-2', 
      pathname.includes('ayur-unity')? "bg-dark-1": "", 
      pathname.includes('quiz')? "bg-slate-100 xl:bg-white": "" 
    )}>
      <MobileSidebar />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar