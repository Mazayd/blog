import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  user: {
    required: true,
    type: ObjectId,
  },
  post: {
    required: true,
    type: ObjectId,
  },
  content: {
    required: true,
    type: String,
  },
  numberOfLikes: {
    default: 0,
    type: Number,
  },
  likes: {
    required: false,
    type: [String],
  },
  dateOfCreate: {
    type: Date,
    default: new Date(),
  },
  dateOfUpdate: {
    required: false,
    type: Date,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export class CommentModel {
  async createComment(data) {
    return await Comment.create(data);
  }
  async getComments(ids) {
    return await Comment.find({ _id: { $in: ids } });
  }
  async getComment(id) {
    return await Comment.findById(id);
  }
  async updateComment(id, data) {
    return await Comment.findOneAndUpdate({ _id: id }, data, { new: true });
  }
  async deleteComment(id) {
    return await Comment.findOneAndDelete({ _id: id });
  }
}
