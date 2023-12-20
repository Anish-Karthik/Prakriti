import React from "react"
import { redirect } from "next/navigation"

import { currentUser } from "@/hooks/currentUser"
import Navbar from "@/components/shared/Navbar"
import Sidebar from "@/components/shared/Sidebar"

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await currentUser()
  if (!userInfo?.onboarded) redirect("/onboarding")
  return (
    <div className="h-full relative">
      {/* desktop view */}
      <div className="hidden h-full lg:flex lg:flex-col lg:fixed lg:w-72 inset-y-0 z-[80] bg-gray-900 mr-2">
        <div>
          <Sidebar />
        </div>
      </div>
      <main className="lg:pl-72 h-full max-h-[90vh]">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashBoardLayout
