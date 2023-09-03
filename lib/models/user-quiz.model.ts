import mongoose from "mongoose";

const userQuizSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  questionsMCQ: {
    type: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserQuiz = mongoose.models.UserQuiz || mongoose.model("UserQuiz", userQuizSchema);

export default UserQuiz;