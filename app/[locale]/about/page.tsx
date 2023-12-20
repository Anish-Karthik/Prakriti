import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import LandingNavbar from "@/components/shared/LandingNavbar"

const doctors = [
  {
    name: "Dr. Shiva Ranjini",
    phone: "+91 99943 95925",
  },
  {
    name: "Dr. Aparna Priya",
    phone: "+91 93459 55447",
  },
]

const AboutPage = () => {
  return (
    // citations and references are included
    // add a background image
    <div className="h-full">
      <LandingNavbar />
      <div className="flex flex-col items-start justify-center min-h-screen py-2 relative z-10">
        <h1 className="text-6xl font-bold pl-20">References</h1>
        <main className="flex flex-col items-start justify-center flex-1 px-20 text-center mt-[-70px] ml-[-15px]"></main>
        <h1 className="text-6xl font-bold pl-20 mt-[-60px]">Doctors</h1>
        <main className="flex flex-col items-start justify-center flex-1 px-20 text-center mt-[-70px]">
          {doctors.map((doctor, index) => (
            <div key={index} className="text-2xl font-bold flex flex-row">
              <p>{doctor.name}</p>
              <Link type="phone" href={`tel:${doctor.phone}`}>
                <Button variant={"link"} className="text-blue-500">
                  {doctor.phone}
                </Button>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}

export default AboutPage
