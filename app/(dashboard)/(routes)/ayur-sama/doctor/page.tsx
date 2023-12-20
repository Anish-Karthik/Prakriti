import db from "@/lib/db"
import { currentUser } from "@/hooks/currentUser"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorCard from "@/components/cards/DoctorCard"

// show available doctors to schedule an appointment (online meeting room)
const page = async () => {
  const user = (await currentUser())!
  const usersWithMeetingScheduledWithCurrentUserWhoIsDoctor =
    await db.meeting.findMany({
      where: {
        doctor: {
          userId: user.id,
        },
      },
      include: {
        user: true,
      },
    })

  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      doctor: true,
    },
  })

  if (!userInfo) {
    return null
  }

  return (
    <Tabs defaultValue="available" className="h-full p-4 ">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="accepted">History</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {usersWithMeetingScheduledWithCurrentUserWhoIsDoctor
            .filter((e) => e.status !== "PENDING" && e.status !== "ACCEPTED")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.user}
                currUser={user}
                meetingId={meeting.id}
                type="PENDING"
              />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {usersWithMeetingScheduledWithCurrentUserWhoIsDoctor
            .filter((e) => e.status === "PENDING")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.user}
                currUser={user}
                meetingId={meeting.id}
                type="PENDING"
              />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="accepted">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {usersWithMeetingScheduledWithCurrentUserWhoIsDoctor
            .filter((e) => e.status === "ACCEPTED")
            .map((meeting, ind) => (
              <DoctorCard
                key={ind}
                user={meeting.user}
                currUser={user}
                meetingId={meeting.id}
                type="ACCEPTED"
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default page
