import { NextResponse } from "next/server"
import getSession from "@/actions/getSession"

import User from "@/lib/models/user.model"
import db from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const { userId, prakriti } = await req.json()

    console.log(userId)
    const session = await getSession()
    if (!session?.user?.email) {
      return NextResponse.json("Not a User")
    }
    const user = await db.user.findFirst({
      where: {
        email: session?.user?.email!,
      },
    })
    if (!user) {
      return NextResponse.json("Not a User")
    }
    const f = await db.user.update({
      where: {
        id: user.id!,
      },
      data: {
        prakriti: prakriti,
      },
    })

    console.log("Success")
    return NextResponse.json("Success")
  } catch (e: any) {
    console.log(e)
    return NextResponse.json(e)
  }
}
