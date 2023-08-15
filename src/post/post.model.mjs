import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const LikesSchema = new mongoose.Schema({
  user: {
    required: true,
    type: ObjectId,
  },
});

const PostSchema = new mongoose.Schema({
  user: {
    required: true,
    type: ObjectId,
  },
  content: {
    required: true,
    type: String,
  },
  hashtags: {
    required: false,
    type: [String],
  },
  comments: {
    required: false,
    type: [ObjectId],
  },
  likes: {
    required: false,
    type: [LikesSchema],
  },
  numberOfLikes: {
    default: 0,
    type: Number,
  },
  dateOfCreation: {
    required: true,
    type: Date,
    default: new Date(),
  },
  dateOfUpdate: {
    required: false,
    type: Date,
  },
});

const Post = mongoose.model("Post", PostSchema);

export class PostModel {
  async createPost(data) {
    return await Post.create(data);
  }
  async getPost(id) {
    return await Post.findById(id);
  }
  async getPostsByHashtags(hashtags) {
    return await Post.find({ hashtags: { $in: hashtags } });
  }
  async getPostsByUserId(id) {
    return await Post.find({ user: id });
  }
}
