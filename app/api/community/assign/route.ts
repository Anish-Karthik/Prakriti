import { NextResponse } from "next/server"

import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge"

import {
  addMemberToCommunity,
  type TCommunityUsername,
} from "@/lib/actions/community.actions"
import { updateUserQuiz } from "@/lib/actions/user-quiz.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { TquestionMCQ } from "@/lib/questions"
import { TAnswer } from "@/components/forms/Quiz"
import getCurrentUser from "@/hooks/useCurrentUser"
import { ObjectId } from "mongoose"

export async function POST(req: Request) {
  try {
    
    const body = await req.json()
    const { prakriti, previousPrakriti } = body

    // if(previousPrakriti == prakriti) {
    //   return new NextResponse("Already assigned", { status: 200 });
    // }

    const user=await getCurrentUser();

   

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }
    if (
      previousPrakriti != "" &&
      previousPrakriti != null &&
      previousPrakriti != undefined &&
      previousPrakriti != prakriti
    ) {
      //@ts-ignore
      await removeUserFromCommunity({
        //@ts-ignore
        userId: user.id as unknown as ObjectId,
        communityUsername: previousPrakriti,
      })
    }
    await addMemberToCommunity({
      //@ts-ignore
      userId: user.id,
      communityUsername: prakriti,
    })
    user.prakriti = prakriti

    

    const responseObj = {
      success: true,
      prakriti,
    }

    return new NextResponse(JSON.stringify(responseObj), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[COMMUNITY_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
