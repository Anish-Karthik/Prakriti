"use client"
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NEXT_PUBLIC_APP_NAME } from '@/public/constants'
import { FileIcon, LayoutDashboardIcon, MessageSquareIcon, FileQuestion, Users, HeartPulse, HelpCircle, SettingsIcon,Apple,SunSnow } from "lucide-react"

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

// get current path
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='space-y-4 py-2 flex flex-col h-full bg-[#111827] text-white '>
      <div className='px-3 py-2 flex-1'>
        <Link href='/' className="flex items-center pl-2 ">
          <div className='relative w-8 h-8 mr-4'>
            <Image 
              fill
              alt='logo'
              src={'/images/favicon.ico'}
            />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            {NEXT_PUBLIC_APP_NAME}
          </h1>
        </Link>

        <div className='space-y-1.5 pt-3 lg:pt-4'>
          {routes.map((route) =>(
            
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ',
                montserrat.className,
                pathname === route.href? 'bg-white/50 !important text-black/90' : '',
              )}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn('w-5 h-5 mr-2',route.color)} aria-hidden='true' />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

export const routes:{
  label: string,
  icon: any,
  href: string,
  color: string,
}[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/dashboard',
    color: "text-sky-500",
  },
  
  {
    label: 'Chatbot',
    icon: MessageSquareIcon,
    href: '/chatbot',
    color: "text-emerald-500",
  },
  {
    label: 'Diet Plan',
    icon: Apple,
    href: '/diet-plan',
    color: "text-red-500",
  },
  {
    label: 'Ayur-Unity',
    icon: Users,
    href: "/ayur-unity",
    color: "text-sky-500",
  },
  {
    label: 'Expert Consultation',
    icon: HeartPulse,
    href: '/expert-consultation',
    color: "text-red-700",
  },
  
  {
    label: 'Seasonal Care',
    icon:   SunSnow,
    href: '/seasonal-care',
    color: "text-yellow-500",
  },
  {
    label: 'FAQs',
    icon: HelpCircle,
    href: '/faq',
    color: "text-green-500",
  },
  {
    label: 'Profile',
    icon: FileIcon,
    href: '/profile',
    color: "text-white-500",
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: "text-white-500",
  },
]

