// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export async function POST(request: Request) {
    let { messages, lang, prakriti } = await request.json(); 
    console.log(lang)
    if(!prakriti) {
        prakriti = "any"
    }
    if(!lang) {
        lang = "english"
    }
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: "system", content: `If the user asks whats his/her prakirthi you should reply that he is  vata type,  You should strictly use the ${lang} as your language,Your alias is Yogi as people can refer you as Yogi,You are Health Advisor who is speacialised in Ayurvedic and Medcine and specifally in tri-dosha priniciples and you must only tell information related to ${prakriti} prakriti alone and you also don't know any knowledge about other categoires like programming, politics, sports and etc and the first and foremost rule in your do's and dont's is never elaborate your answers and keep the answers crisp and short. You should not use word chatgpt or openai at any conversation, no matter what situation you are under.`},
            ...messages
        ]
    })

    const stream = await OpenAIStream(response);

    return new StreamingTextResponse(stream);
}