"use client"

import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"

import MobileSidebar from "./MobileSidebar"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        "flex items-center pr-8 pt-2",
        pathname.includes("ayur-unity") ? "bg-dark-1" : "",
        pathname.includes("quiz") ? " xl:bg-white" : ""
      )}
    >
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
