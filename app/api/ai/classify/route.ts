import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge"

const runtime = "edge"
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    // TODO

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 })
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 })
    }
  } catch (error) {
    console.error("[CODE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
