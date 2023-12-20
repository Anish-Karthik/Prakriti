import { getServerSession } from "next-auth"

import { authOptions } from "@/app/[locale]/api/auth/[...nextauth]/authOptions"

export default async function getSession() {
  return await getServerSession(authOptions)
}
