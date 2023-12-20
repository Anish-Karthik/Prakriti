import { NextRequest, NextResponse } from "next/server"
import { AccessToken } from "livekit-server-sdk"

export async function POST(req: Request) {
  try {
    // const body = (await req.json()).body
    const { room, username } = await req.json()
    // const room = req.nextUrl.searchParams.get("room")
    // const username = req.nextUrl.searchParams.get("id")

    console.log(username)
    console.log(room)
    if (!room) {
      return NextResponse.json(
        { error: 'Missing "room" query parameter' },
        { status: 400 }
      )
    } else if (!username) {
      return NextResponse.json(
        { error: 'Missing "username" query parameter' },
        { status: 400 }
      )
    }

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      )
    }

    const at = new AccessToken(apiKey, apiSecret, { identity: username })

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })

    return NextResponse.json({ token: at.toJwt() })
  } catch (error) {
    console.log(error)
  }
}
