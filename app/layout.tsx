
import AuthContext from "./context/AuthContext"

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NEXT_PUBLIC_APP_DESCRIPTION } from "@/public/constants"
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import { ToasterProvider } from "@/components/toaster-provider"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en">
        <body className="h-screen w-screen overflow-x-hidden">
          <AuthContext>
          <ToasterProvider />
          {children}
         
          </AuthContext>
        </body>
      </html>
    
  )
}
