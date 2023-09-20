
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { updateUserQuiz } from '@/lib/actions/user-quiz.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { TAnswer } from '@/components/forms/Quiz';
import { addMemberToCommunity, removeUserFromCommunity, type TCommunityUsername } from '@/lib/actions/community.actions';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { answers } = body;
    // TODO

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    // const prakriti = await axios.post('https://prakriti-classifier-code-o-sapiens.onrender.com/predict_api', 
    //   {data: [vata, pitta, kapha]}
    // );

    // const prakriti = await axios.post('https://prakriti-classifier-code-o-sapiens.onrender.com/predict_api', 
    //   {data: [vata, pitta, kapha]}
    // );
    let data = JSON.stringify({"data": [vata, pitta, kapha]});

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://prakriti-classifier-code-o-sapiens.onrender.com/predict_api',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const response = await axios.request(config);
    const prakriti = response.data;

    console.log(prakriti);
    if(!prakriti) {
      throw new Error("Prakriti not found");
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
    console.error("[QUIZ_ERROR]",error);
    return new NextResponse("Internal error", { status: 500 });
  }
}