import mongoose from "mongoose"

const userQuizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vata: { type: Number, default: 0 },
  pitta: { type: Number, default: 0 },
  kapha: { type: Number, default: 0 },
  answers: {
    type: [Number],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const UserQuiz =
  mongoose.models.UserQuiz || mongoose.model("UserQuiz", userQuizSchema)

export default UserQuiz
