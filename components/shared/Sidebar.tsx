"use client"

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'
import { NEXT_PUBLIC_APP_NAME } from '@/public/constants'
import { FileIcon, LayoutDashboardIcon, MessageSquareIcon, ImageIcon, VideoIcon, MusicIcon, CodeIcon, SettingsIcon } from "lucide-react"

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});


const Sidebar = () => {
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
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

        <div className='space-y-1'>
          {routes.map((route) =>(
            
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ',
                montserrat.className,
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
    label: 'General Quiz',
    icon: ImageIcon,
    href: '/quiz',
    color: "text-pink-700",
  },
  {
    label: 'Pesonalized Quiz',
    icon: VideoIcon,
    href: '/video',
    color: "text-orange-700",
  },    
  {
    label: 'Conversation',
    icon: MessageSquareIcon,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Chatbot',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
  },
  {
    label: 'Forum',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-500",
  },
  {
    label: 'Expert Consultation',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
  },
  {
    label: 'FAQs',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-500",
  },
  {
    label: 'Articles',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
  },
  {
    label: 'Reviews',
    icon: CodeIcon,
    href: '/code',
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

