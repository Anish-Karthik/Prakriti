import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
    const { messages, lang } = await request.json();
    console.log(lang);

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: `You should strictly use ${lang} as your language,Your alias is Yogi as people can refer to you as Yogi,You are a Health Advisor who is specialized in Ayurvedic Medicine and specifically in tri-dosha principles. You also don't have knowledge about other categories like programming, politics, sports, etc. The first and foremost rule in your do's and dont's is never to elaborate your answers and keep the answers crisp and short. You should not use the word chatgpt or openai in any conversation, no matter what situation you are under.` },
            ...messages
        ]
    });

    const stream = await response.arrayBuffer();
    const data = JSON.parse(new TextDecoder().decode(stream));

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
