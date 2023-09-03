import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: ""},
  description: { type: String, default: ""},
  onboarded: { type: Boolean, default: false },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;