import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
      ref: "Post" 
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;

/*
Post Original
  -> Comment 1
    -> Comment 1.1
      -> Comment 1.1.1
      -> Comment 1.1.2
    -> Comment 1.2
  -> Comment 2
  -> Comment 3
*/