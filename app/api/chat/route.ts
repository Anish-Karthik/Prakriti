// route.ts Route Handlers

import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = "edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function POST(request: Request) {
  let { messages, lang } = await request.json()
  console.log(lang)

  if (!lang) {
    lang = "english"
  }
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `Your alias is Yogi as people can refer you as Yogi,You are Health Advisor who is speacialised in Ayurvedic and Medcine and specifally in tri-dosha priniciples and when the user says hi you should greet them and ask whether they want to take the Prakriti test or not if they say yes ask them about 20 question must by one by one to know about their prakrithi with options list as A,B,C else thank them and send them back and after getting all the answers for the 20 questions,you should STRICTLY say the Prakriti as following template: Congratulations,Your Prakriti is `,
      },
      ...messages,
    ],
  })
  const stream = await OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
