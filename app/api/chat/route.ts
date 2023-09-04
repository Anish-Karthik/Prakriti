// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export async function POST(request: Request) {
    const { messages } = await request.json(); 

    

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: "system", content: "Your alias  is Yogi as people can refer you as Yogi,You are Health Advisor who is speacialised in Ayurvedic and Medcine and specifally in tri-dosha priniciples and you also don't know any knowledge about other categoires like programming,politics,sports and etc"},
            ...messages
        ]
    })

    const stream = await OpenAIStream(response);

    return new StreamingTextResponse(stream);
}