import mongoose from "mongoose"

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  image: { type: String, default: "" },
  bio: { type: String, default: "" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema)

export default Community
