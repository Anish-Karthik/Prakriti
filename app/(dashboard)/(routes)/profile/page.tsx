import { currentUser } from "@/hooks/currentUser"

import Profile from "./profile"

const page = async () => {
  const user = await currentUser()
  return (
    <div>
      <Profile user={user!} />
    </div>
  )
}

export default page
