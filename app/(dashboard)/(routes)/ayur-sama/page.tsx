import React from "react"
import { currentUser } from "@clerk/nextjs"

const page = async () => {
  const user = await currentUser()

  return <div>Page under Development</div>
}

export default page
