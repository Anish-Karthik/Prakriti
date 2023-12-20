import db from "@/lib/db"

import getSession from "./GetSession"

export async function currentUser() {
  const session = await getSession()
  if (!session?.user?.email) {
    return null
  }
  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  })
  return user
}
