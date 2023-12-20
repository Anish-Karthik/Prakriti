import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prismadb"
import { authOptions } from "@/app/[locale]/api/auth/[...nextauth]/authOptions"

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user?.email) {
      return
      //TODO:CHECK WHETHER IT WORK
      //throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    })
    if (!currentUser) {
      throw new Error("User not found")
    }

    return { currentUser }
  } catch (e: any) {
    console.log(e)
    return
  }
}

export default serverAuth
