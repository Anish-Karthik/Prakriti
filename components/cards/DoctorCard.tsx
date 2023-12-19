import React from "react"
import Image from "next/image"

import { Button } from "../ui/button"

const DoctorCard = ({
  doctor,
}: {
  doctor: {
    name: string
    specialty: string
    image: string
  }
}) => {
  return (
    <div className="flex h-full flex-col gap-2 rounded-md bg-slate-100 justify-center p-2 shadow-md">
      <center className="py-2">
        <Image
          src={doctor.image}
          width={100}
          height={100}
          alt={"img"}
          className="rounded-full shadow-md"
        />
      </center>
      <div>
        <h2 className="text-center font-bold text-2xl text-glassmorphism text-slate-500">
          {doctor.name}
        </h2>
        <p className="text-center font-semibold !text-base text-slate-400">
          {doctor.specialty}
        </p>
      </div>
      <div className="w-full px-5">
        <Button className="w-full" variant={"default"}>
          Book Appointment
        </Button>
        <Button className="w-full" variant={"ghost"}>
          Message
        </Button>
      </div>
    </div>
  )
}

export default DoctorCard
