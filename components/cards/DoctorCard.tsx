import Image from "next/image"
import { Doctor, User } from "@prisma/client"

import AcceptRejectButton from "../shared/AcceptRejectButton"
import BookButton from "../shared/BookButton"
import { Button } from "../ui/button"

const DoctorCard = ({
  user,
  currUser,
  meetingId,
  type,
}: {
  currUser: User
  user: User & { doctor?: Doctor | null }
  meetingId?: string
  type: "ACCEPTED" | "PENDING" | "REJECTED"
}) => {
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
      {type === "PENDING" && (
        <div className="w-full px-5 flex flex-col gap-2">
          <AcceptRejectButton meetingId={meetingId} />
          {!!user.doctor && (
            <BookButton
              viewingUser={user}
              currentUserId={currUser.id}
              meetingId={meetingId}
            />
          )}
          <Button className="w-full" variant={"ghost"}>
            Message
          </Button>
        </div>
      )}
      {type === "ACCEPTED" && user.doctor && (
        <div className="w-full px-5 flex flex-col gap-2">
          <Button className="w-full">Feedback</Button>
        </div>
      )}
      {type === "ACCEPTED" && user.doctor && (
        <div className="w-full px-5 flex flex-col gap-2">
          <Button className="w-full">View</Button>
        </div>
      )}
    </div>
  )
}

export default DoctorCard
