import { redirect } from "next/navigation"

import db from "@/lib/db"
import { currentUser } from "@/hooks/currentUser"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorCard from "@/components/cards/DoctorCard"

// show available doctors to schedule an appointment (online meeting room)
const page = async () => {
  const user = await currentUser()
  const userIsDoctor = await db.doctor.findUnique({
    where: { userId: user?.id },
  })
  if (userIsDoctor) redirect("/ayur-sama/doctor")
  const doctors = (
    await db.user.findMany({ include: { doctor: true } })
  ).filter((e) => e.doctor)
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
          },
        },
      },
      user: true,
    },
  })

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
            <DoctorCard
              key={ind}
              user={doctor}
              currUser={user!}
              type="PENDING"
            />
          ))}
          {userMeetings
            .filter((e) => e.status !== "PENDING" && e.status !== "ACCEPTED")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.doctor.user}
                meetingId={meeting.id}
                currUser={user!}
                type="REJECTED"
              />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {userMeetings
            .filter((e) => e.status === "PENDING")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.doctor.user}
                meetingId={meeting.id}
                currUser={user!}
                type="PENDING"
              />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="accepted">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {userMeetings
            .filter((e) => e.status === "ACCEPTED")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.doctor.user}
                meetingId={meeting.id}
                currUser={user!}
                type="ACCEPTED"
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default page
