import React from "react"

import getCurrentUser from "@/hooks/useCurrentUser"

import Profile from "./profile"

const page = async () => {
  const user = await getCurrentUser()
  return (
    <div>
      <Profile user={user!} />
    </div>
  )
}

export default page
