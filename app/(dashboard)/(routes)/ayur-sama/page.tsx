import React from "react"
import { currentUser } from "@clerk/nextjs"

import DoctorCard from "@/components/cards/DoctorCard"

// show available doctors to schedule an appointment (online meeting room)
const page = async () => {
  const user = await currentUser()
  const doctors = [
    {
      name: "Dr. Cody Brian",
      specialty: "Ayurveda",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Dr. Scott Scott",
      specialty: "Ayurveda",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Dr. Scott Jones",
      specialty: "Ayurveda",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "John",
      specialty: "Ayurveda",
      image: "https://picsum.photos/200/200",
    },
  ] //await getDoctors();

  return (
    <div className="h-full p-4 ">
      <h1 className="text-3xl text-glassmorphism mb-2">Available Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {doctors.map((doctor, ind) => (
          <DoctorCard key={ind} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}

export default page
