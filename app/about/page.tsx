import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import LandingNavbar from "@/components/shared/LandingNavbar"

const citations = [
  {
    name: "Image Recognition and Classification",
    link: "https://sl.bing.net/bCbgRrSJfpc",
  },
  {
    name: "Image Recognition and Classification Papers",
    link: "https://www.sciencedirect.com/science/article/pii/S2667096820300070",
  },
  {
    name: "Voice Recognition",
    link: "https://sl.bing.net/kuv8hV1aRaK",
  },
  {
    name: "text classification",
    link: "https://sl.bing.net/jkNxKQamEk8",
  },
  {
    name: "transformers",
    link: "https://sl.bing.net/gxYB3Wc978u",
  },
  {
    name: "Generative Pretained Transformers",
    link: "https://sl.bing.net/gU7rI3j66H6",
  },
]

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
        <main className="flex flex-col items-start justify-center flex-1 px-20 text-center mt-[-70px] ml-[-15px]">
          {citations.map((citation, index) => (
            <Link
              key={index}
              href={citation.link}
              target="_blank"
              className="text-2xl font-bold"
            >
              <Button variant={"link"} className="text-blue-500">
                {citation.name}
              </Button>
            </Link>
          ))}
        </main>
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
