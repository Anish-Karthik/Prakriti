import React from 'react'
import { Button } from '../ui/button'
import db from '@/lib/db'

const AcceptRejectButton = ({
  meetingId
}: {
  meetingId?: string
}) => {
  async function acceptMeeting() {
    await db.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "ACCEPTED",
      },
    })
    console.log("accept")
  }
  async function rejectMeeting() {
    await db.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "REJECTED",
      },
    })
    console.log("reject")
  }
  return (
    <div className='flex gap-2 w-full'>
      <Button onClick={acceptMeeting}>Accept</Button>
      <Button onClick={rejectMeeting}>Reject</Button>
    </div>
  )
}

export default AcceptRejectButton