import React from "react"

import { MediaRoom } from "@/components/video/media-room"

const page = ({ params }: { params: { id: string } }) => {
  return <MediaRoom chatId={params.id} video={true} audio={true} />
}

export default page
