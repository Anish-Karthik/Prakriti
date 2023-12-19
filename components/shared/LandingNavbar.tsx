"use client"

import React from "react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { NEXT_PUBLIC_APP_NAME } from "@/public/constants"
import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

const LandingNavbar = () => {
  

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/images/favicon.ico" />
        </div>
        <div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            {NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <Link href={"/sign-in"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>

        <Link href="/about">
          <InfoIcon color={"white"} width={"35"} height={"35"} />
        </Link>
      </div>
    </nav>
  )
}

export default LandingNavbar
