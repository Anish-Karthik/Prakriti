"use server"

import db from "../db"

export const bookAMeeting = async ({userId, doctorId, time}: {userId: string, doctorId: string, time: string}) => {
  const meeting = await db.meeting.create({
    data: {
      time,
      doctorId,
      userId,
    }
  })
  // mail the user
  // mail the doctor
  return meeting
}


export const cancelAMeeting = async ({meetingId}: {meetingId: string}) => {
  const meeting = await db.meeting.delete({
    where: {
      id: meetingId
    }
  })
  // mail the user
  // mail the doctor
  return meeting
}

export const changeBookTiming = async ({meetingId, time}: {meetingId: string, time: string}) => {
  const meeting = await db.meeting.update({
    where: {
      id: meetingId
    },
    data: {
      time
    }
  })
  // mail the user
  // mail the doctor
  return meeting
}