"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { acceptMeeting, rejectMeeting } from "@/lib/actions/meeting.actions"

import { Button } from "../ui/button"

const AcceptRejectButton = ({ meetingId }: { meetingId?: string }) => {
  const router = useRouter()
  async function acceptMeetingf() {
    await acceptMeeting({ meetingId: meetingId! })
    router.push(`/ayur-sama/${meetingId}`)
  }
  async function rejectMeetingf() {
    await rejectMeeting({ meetingId: meetingId! })
    router.push(`/ayur-sama/${meetingId}`)
  }
  return (
    <div className="flex gap-2 w-full justify-between">
      <Button onClick={acceptMeetingf} variant="default" className="w-full">
        Accept
      </Button>
      <Button onClick={rejectMeetingf} variant="destructive" className="w-full">
        Reject
      </Button>
    </div>
  )
}

export default AcceptRejectButton
