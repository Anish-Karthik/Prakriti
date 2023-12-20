import React from "react"

import getCurrentUser from "@/hooks/useCurrentUser"
import { MediaRoom } from "@/components/video/media-room"

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser()
  return <MediaRoom user={user!} chatId={params.id} video={true} audio={true} />
}

export default page
