"use client"
import React from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { bookAMeeting, changeBookTiming } from '@/lib/actions/meeting.actions'
import { Doctor, User } from '@prisma/client'

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
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }
  return result
}


const BookButton = ({
  viewingUser,
  currentUserId,
  meetingId
}: {
  viewingUser: User & { doctor?: Doctor }
  currentUserId: string
  meetingId?: string
}) => {
  const [option, setOption] = React.useState("any")
  const validTimingFromCurrentHour = getValidTimings()

  const userId = getRandomString(10)
  async function onClickMeetButton() {
    const roomId = Math.ceil(Math.random() * 1e8) //await axios.get("https://www.uuidgenerator.net/api/version7")
    // add a pending meeting to a doctor with a specific time to create a meeting
    if (meetingId) {
      await changeBookTiming({
        meetingId,
        time: option,
      })
      return 
    }
    if (viewingUser.doctor) {
      await bookAMeeting({
        userId,
        doctorId: viewingUser.doctor.id,
        time: option,
      })
    }
    console.log(roomId)
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full" variant={"default"}>
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Timing</DialogTitle>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">As per doctor{"'"}s availability</SelectItem>
              {/* each hour from current hour till 12 midnight */}
              {validTimingFromCurrentHour.map((hour, ind) => (
                <SelectItem key={ind} value={hour.toString()}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onClickMeetButton}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookButton