"use server"

import db from "../db"

export const bookAMeeting = async ({
  userId,
  doctorId,
  time,
}: {
  userId: string
  doctorId: string
  time: string
}) => {
  // check is there any pending meeting?
  const pendingMeeting = await db.meeting.findFirst({
    where: {
      userId,
      doctorId,
      status: "PENDING",
    },
  })
  if (pendingMeeting) {
    throw new Error("You already have a pending meeting")
  }
  const meeting = await db.meeting.create({
    data: {
      time,
      doctorId,
      userId,
    },
  })
  // mail the user
  // mail the doctor
  return meeting
}

export const cancelAMeeting = async ({ meetingId }: { meetingId: string }) => {
  const meeting = await db.meeting.delete({
    where: {
      id: meetingId,
    },
  })
  // mail the user
  // mail the doctor
  return meeting
}

export const changeBookTiming = async ({
  meetingId,
  time,
}: {
  meetingId: string
  time: string
}) => {
  const meeting = await db.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      time,
    },
  })
  // mail the user
  // mail the doctor
  return meeting
}

export const acceptMeeting = async ({ meetingId }: { meetingId: string }) => {
  try {
    const meeting = await db.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "ACCEPTED",
      },
    })
    // mail the user
    // mail the doctor
    return meeting
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const rejectMeeting = async ({ meetingId }: { meetingId: string }) => {
  const meeting = await db.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      status: "REJECTED",
    },
  })
  // mail the user
  // mail the doctor
  return meeting
}
