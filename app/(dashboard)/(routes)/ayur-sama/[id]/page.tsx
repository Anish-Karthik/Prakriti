import { currentUser } from "@/hooks/currentUser"
import { MediaRoom } from "@/components/video/media-room"

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser()

  return <MediaRoom user={user!} chatId={params.id} video={true} audio={true} />
}

export default page
