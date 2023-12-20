//@ts-ignore

import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "@/lib/prismadb"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(name + "heoo")

  const user = await prisma.user.create({
    data: {
      username: email,
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
