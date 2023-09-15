
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai-edge';
import { updateUserQuiz } from '@/lib/actions/user-quiz.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { TquestionMCQ } from '@/lib/questions';
import { TAnswer } from '@/components/forms/Quiz';

const runtime = 'edge';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { answers } = body;
    // TODO

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!answers) {
      return new NextResponse("Missing messages", { status: 400 });
    }
    let vatta=0,pitta=0,kapha=0;

    const user = await fetchUser(userId);

    if(!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const ans = answers.map((answer: TAnswer) => answer.option);
    
    updateUserQuiz(user._id, ans)
    
    for(const answer of answers)
    {
      if(answer.type=='vatta')
        vatta++;
      else if(answer.type=='pitta')
        pitta++;
      else if(answer.type=='kapha')
        kapha++;
    }
    const responseObj = {
      vatta,
      pitta,
      kapha
    };
    


    return new NextResponse(JSON.stringify(responseObj), { status: 200, headers: { 'Content-Type': 'application/json' } });
    
  } catch (error) {
    console.error("[CODE_ERROR]",error);
    return new NextResponse("Internal error", { status: 500 });
  }
}