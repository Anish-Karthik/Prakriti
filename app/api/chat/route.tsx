// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import questionMCQarray from "@/lib/questions";
export const runtime='edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export async function POST(request: Request) {
    let { messages, lang } = await request.json(); 
    console.log(lang)
    
    if(!lang) {
        lang = "english"
    }
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: "system", content: `You should strictly use the ${lang} as your language,Your alias is Yogi as people can refer you as Yogi,You are Health Advisor who is speacialised in Ayurvedic and Medcine and specifally in tri-dosha priniciples and when the user says hi you should greet them and ask whether they want to take the Prakriti test or not if they say yes ask them 10 question one by one to know about their prakrithi else thank them and send them back`},
            ...messages
        ]
    })
    const stream = await OpenAIStream(response);

    return new StreamingTextResponse(stream);
    
}