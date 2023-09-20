
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai-edge';
import { updateUserQuiz } from '@/lib/actions/user-quiz.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { TquestionMCQ } from '@/lib/questions';
import { TAnswer } from '@/components/forms/Quiz';
import { addMemberToCommunity, removeUserFromCommunity, type TCommunityUsername } from '@/lib/actions/community.actions';

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
    let vata=0,pitta=0,kapha=0;

    const user = await fetchUser(userId);

    if(!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const ans = answers.map((answer: TAnswer) => answer.option);
    
    for(const answer of answers)
    {
      if(answer.type=='vata')
        vata++;
      else if(answer.type=='pitta')
        pitta++;
      else if(answer.type=='kapha')
        kapha++;
    }

    await updateUserQuiz(user._id, ans, {vata, pitta, kapha});
    
    // TODO: Replace this with a AI model to predict prakriti
    let prakriti: TCommunityUsername = "vata";
    // assign prakriti on the basis of vata, pitta, kapha, vata-pitta, pitta-kapha, kapha-vata, vata-pitta-kapha
    // assign vata-pitta, pitta-kapha, kapha-vata if difference is less than 10%
    // assign vata-pitta-kapha if difference is less than 5%
    
    if(vata>pitta && vata>kapha) {
      if(vata-pitta<10 && vata-kapha<10)
        prakriti = "vata-pitta";
      else if(vata-pitta<5 && vata-kapha<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "vata";
    } else if(pitta>vata && pitta>kapha) {
      if(pitta-vata<10 && pitta-kapha<10)
        prakriti = "vata-pitta";
      else if(pitta-vata<5 && pitta-kapha<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "pitta";
    } else if(kapha>vata && kapha>pitta) {
      if(kapha-vata<10 && kapha-pitta<10)
        prakriti = "kapha-vata";
      else if(kapha-vata<5 && kapha-pitta<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "kapha";
    } else if(vata==pitta && vata>kapha) {
      if(vata-kapha<10)
        prakriti = "vata-pitta";
      else if(vata-kapha<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "vata";
    } else if(vata==kapha && vata>pitta) {  
      if(vata-pitta<10)
        prakriti = "vata-pitta";
      else if(vata-pitta<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "vata";
    } else if(pitta==kapha && pitta>vata) {
      if(pitta-vata<10)
        prakriti = "vata-pitta";
      else if(pitta-vata<5)
        prakriti = "vata-pitta-kapha";
      else
        prakriti = "pitta";
    } else if(vata==pitta && vata==kapha) {
      prakriti = "vata-pitta-kapha";
    }
    // localStorage.setItem("prakriti",prakriti);
    const responseObj = {
      vata,
      pitta,
      kapha,
      prakriti,
      previousPrakriti: user.prakriti,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200, headers: { 'Content-Type': 'application/json' } });
    
  } catch (error) {
    console.error("[CODE_ERROR]",error);
    return new NextResponse("Internal error", { status: 500 });
  }
}