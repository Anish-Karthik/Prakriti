"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Doctor, User } from "@prisma/client"
import toast from "react-hot-toast"

import { bookAMeeting, changeBookTiming } from "@/lib/actions/meeting.actions"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"

function getValidTimings() {
  const currentHour = new Date().getHours()
  const validTimings = []
  for (let i = currentHour; i < 24; i++) {
    validTimings.push(i)
  }
  return validTimings
}

function getRandomString(length: number) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const BookButton = ({
  viewingUser,
  currentUserId,
  meetingId,
}: {
  viewingUser: User & { doctor?: Doctor | null }
  currentUserId: string
  meetingId?: string
}) => {
  const [option, setOption] = React.useState("any")
  const [isBooked, setIsBooked] = React.useState(false)
  const validTimingFromCurrentHour = getValidTimings()
  const router = useRouter()

  async function onClickMeetButton() {
    try {
      // await axios.get("https://www.uuidgenerator.net/api/version7")
      // add a pending meeting to a doctor with a specific time to create a meeting
      if (meetingId) {
        await changeBookTiming({
          meetingId,
          time: option,
        })
      } else if (viewingUser.doctor) {
        await bookAMeeting({
          userId: currentUserId,
          doctorId: viewingUser.doctor.id,
          time: option,
        })
      }
    } catch (error) {
      toast.error("Already same meeting is in pending")
    }
    setIsBooked(true)
  }
  return (
    <Dialog>
      <DialogTrigger>
        {!isBooked ? (
          <Button className="w-full" variant={"default"}>
            Book Appointment
          </Button>
        ) : (
          <Button className="w-full" variant={"default"}>
            Enter
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!isBooked ? "Select a Timing" : "Ready? Then join now"}
          </DialogTitle>
          {!isBooked && (
            <Select onValueChange={(v) => setOption(v)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="As per doctor's availability"
                  defaultValue={"As per doctor's availability"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">
                  As per doctor{"'"}s availability
                </SelectItem>
                {/* each hour from current hour till 12 midnight */}
                {validTimingFromCurrentHour.map((hour, ind) => (
                  <SelectItem key={ind} value={hour.toString()}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={
              !isBooked
                ? onClickMeetButton
                : () => router.push(`/ayur-sama/${meetingId}`)
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookButton
