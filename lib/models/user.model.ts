import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  bio: { type: String, default: "" },
  onboarded: { type: Boolean, default: false },
  prakriti: { type: String, default: "" },
  // refer community.model.ts for the following 2 fields
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
