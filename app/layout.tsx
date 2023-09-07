import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NEXT_PUBLIC_APP_DESCRIPTION } from '@/public/constants'
import { ToasterProvider } from '@/components/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: NEXT_PUBLIC_APP_DESCRIPTION,
  description: NEXT_PUBLIC_APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='h-screen w-screen overflow-x-hidden'>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
