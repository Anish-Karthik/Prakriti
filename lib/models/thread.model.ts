import mongoose from "mongoose"

const ThreadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Thread = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema)

export default Thread

/*
Thread Original
  -> Comment 1
    -> Comment 1.1
      -> Comment 1.1.1
      -> Comment 1.1.2
    -> Comment 1.2
  -> Comment 2
  -> Comment 3
*/
