import Image from "next/image"

import { Button } from "../ui/button"
import BookButton from "../shared/BookButton"
import { Doctor, User } from "@prisma/client"
import { currentUser, useAuth } from "@clerk/nextjs"
import AcceptRejectButton from "../shared/AcceptRejectButton"

const DoctorCard = ({
  user,
  meetingId,
}: {
  user: User & { doctor?: Doctor }
  meetingId?: string
}) => {
  const userId = useAuth().userId!
  return (
    <div className="flex h-full flex-col gap-2 rounded-md bg-slate-100 justify-center p-2 shadow-md">
      <center className="py-2">
        <Image
          src={user.image}
          width={100}
          height={100}
          alt={"img"}
          className="rounded-full shadow-md"
        />
      </center>
      <div>
        <h2 className="text-center font-bold text-2xl text-glassmorphism text-slate-500">
          {user.name}
        </h2>
        <p className="text-center font-semibold !text-base text-slate-400">
          {user.doctor?.speciality || user.prakriti}
        </p>
      </div>
      <div className="w-full px-5">
        <AcceptRejectButton viewingUser={user} currentUserId={userId} meetingId={meetingId} />
        <BookButton viewingUser={user} currentUserId={userId} meetingId={meetingId} />
        <Button className="w-full" variant={"ghost"}>
          Message
        </Button>
      </div>
    </div>
  )
}

export default DoctorCard
