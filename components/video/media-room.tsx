"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"

import "@livekit/components-styles"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser()
  const { userId } = useAuth()
  const router = useRouter()

  const [Loading, setLoading] = useState(false)
  console.log(user)
  const [token, setToken] = useState("")
  useEffect(() => {
    if (!user) {
      setLoading(true)
    }
    ;(async () => {
      try {
        const tmp = "7967679"
        console.log(userId)
        const resp = await fetch(`/api/livekit?room=${chatId}&id=${userId}`)
        console.log(tmp)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [user?.id, user?.lastName, chatId, user, userId])

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
