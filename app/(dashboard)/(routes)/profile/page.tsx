import React from "react"

import Profile from "./profile"
import getCurrentUser from "@/hooks/useCurrentUser"

const page = async() => {
  const user=await getCurrentUser();
  return (
    <div>
      <Profile user={user!}/>
    </div>
  )
}

export default page
