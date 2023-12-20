import { NextResponse } from "next/server"
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
    const body = await req.json()
    const { messages } = body

    // TODO
  } catch (error) {
    console.error("[CODE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
