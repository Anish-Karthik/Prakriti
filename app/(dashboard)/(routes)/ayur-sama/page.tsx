import React from "react"
import { currentUser } from "@clerk/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import DoctorCard from "@/components/cards/DoctorCard"
import db from "@/lib/db"

// show available doctors to schedule an appointment (online meeting room)
const page = async () => {
  const user = await currentUser()
  const doctors = (await db.user.findMany({include: { doctor: true }})).filter((e) => e.doctor)
  const userMeetings = await db.meeting.findMany({
    where: {
      userId: user!.id,
    },
    include: {
      doctor: {
        include: {
          user: {
            include: {
              doctor: true,
            },
          }
        },
      },
      user: true,
    },
  })
  // const doctors = [
  //   {
  //     name: "Dr. Cody Brian",
  //     specialty: "Ayurveda",
  //     image: "https://picsum.photos/200/200",
  //   },
  //   {
  //     name: "Dr. Scott Scott",
  //     specialty: "Ayurveda",
  //     image: "https://picsum.photos/200/200",
  //   },
  //   {
  //     name: "Dr. Scott Jones",
  //     specialty: "Ayurveda",
  //     image: "https://picsum.photos/200/200",
  //   },
  //   {
  //     name: "John",
  //     specialty: "Ayurveda",
  //     image: "https://picsum.photos/200/200",
  //   },
  // ] //await getDoctors();

  return (
    <Tabs defaultValue="available" className="h-full p-4 ">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="accepted">History</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {doctors.map((doctor, ind) => (
            <DoctorCard key={ind} user={doctor} />
          ))}
          {userMeetings.filter((e) => e.status !== "PENDING" && e.status !== "ACCEPTED").map((meeting, ind) => (
            <DoctorCard key={ind} user={meeting.doctor.user} meetingId={meeting.id}/>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {userMeetings.filter((e) => e.status === "PENDING").map((meeting, ind) => (
            <DoctorCard key={ind} user={meeting.doctor.user} meetingId={meeting.id}/>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="accepted">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {userMeetings.filter((e) => e.status === "ACCEPTED").map((meeting, ind) => (
            <DoctorCard key={ind} user={meeting.doctor.user} meetingId={meeting.id}/>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default page
