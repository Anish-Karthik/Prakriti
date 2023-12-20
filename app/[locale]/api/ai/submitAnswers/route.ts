import { NextResponse } from "next/server"
import axios from "axios"

import {
  addMemberToCommunity,
  removeUserFromCommunity,
  type TCommunityUsername,
} from "@/lib/actions/community.actions"
import { updateUserQuiz } from "@/lib/actions/user-quiz.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { TAnswer } from "@/components/forms/Quiz"

export async function POST(req: Request) {
  try {
    return new NextResponse(JSON.stringify(Response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[QUIZ_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
