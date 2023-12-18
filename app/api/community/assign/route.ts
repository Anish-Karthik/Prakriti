import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge"

import {
  addMemberToCommunity,
  removeUserFromCommunity,
  type TCommunityUsername,
} from "@/lib/actions/community.actions"
import { updateUserQuiz } from "@/lib/actions/user-quiz.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { TquestionMCQ } from "@/lib/questions"
import { TAnswer } from "@/components/forms/Quiz"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prakriti, previousPrakriti } = body

    // if(previousPrakriti == prakriti) {
    //   return new NextResponse("Already assigned", { status: 200 });
    // }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await fetchUser(userId)

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }
    if (
      previousPrakriti != "" &&
      previousPrakriti != null &&
      previousPrakriti != undefined &&
      previousPrakriti != prakriti
    ) {
      await removeUserFromCommunity({
        userId: user._id,
        communityUsername: previousPrakriti,
      })
    }
    await addMemberToCommunity({
      userId: user._id,
      communityUsername: prakriti,
    })
    user.prakriti = prakriti

    await user.save()

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
