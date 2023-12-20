"use client"

import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import axios from "axios"

import "@livekit/components-styles"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import getCurrentUser from "@/hooks/useCurrentUser"

interface MediaRoomProps {
  chatId: string
  video: boolean
  user: User
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio,  user }: MediaRoomProps) => {
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
        const userInfo = await getCurrentUser()
        console.log(user.id)
        // const resp = await fetch(`/api/livekit?room=${chatId}&id=${userId}`)
        const resp = await axios.post(`/api/livekit`, {
          room: chatId,
          username:  userInfo!.id,
        })
                //        const data = await resp.json()
        setToken(resp.data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [user?.id, user?.name, chatId, user, user.id])

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
