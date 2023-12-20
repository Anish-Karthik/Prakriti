import AuthContext from "./context/AuthContext"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NEXT_PUBLIC_APP_DESCRIPTION } from "@/public/constants"
import { appWithTranslation } from "next-i18next"
import { useLocale } from "next-intl"

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
