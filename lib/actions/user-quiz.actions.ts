"use server"
import mongoose from "mongoose"

import UserQuiz from "../models/user-quiz.model"
import { connectToDB } from "../mongoose"

export async function updateUserQuiz(userId: mongoose.Schema.Types.ObjectId, answers: number[]) {
  try {
    connectToDB()
    await UserQuiz.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        answers,
        updatedAt: new Date(),
      },
      { upsert: true }
    );
  } catch (error: any) {
    console.log(error)
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}
export async function fetchUserQuiz(userId: mongoose.Schema.Types.ObjectId) {
  try {
    connectToDB();
    return await UserQuiz
      .findOne({ user: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}