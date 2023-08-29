import { CommentModel } from "./comment.model.mjs";
import { UserModel } from "../user/user.model.mjs";
import { PostModel } from "../post/post.model.mjs";

export class CommentController {
  constructor() {
    this.commentModel = new CommentModel();
    this.userModel = new UserModel();
    this.postModel = new PostModel();
  }
  async createComment(req, res) {
    try {
      const { user_tg_id, post_id } = req.params;
      const { content } = req.body;
      const user = await this.userModel.getUserByTgId(user_tg_id);
      const post = await this.postModel.getPost(post_id);
      if (!post) {
        return res
          .status(404)
          .send({ message: "Post not found", success: false });
      }
      const result = await this.commentModel.createComment({
        user: user._id,
        post: post_id,
        content: content,
      });
      const newComment = [
        result._id.toString() || [],
        ...(post.comments || []),
      ];
      const updatePost = await this.postModel.updatePost(post_id, {
        comments: newComment,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getComments(req, res) {
    try {
      const { post_id } = req.params;
      const post = await this.postModel.getPost(post_id);
      const result = await this.commentModel.getComments(post.comments);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getCommentById(req, res) {
    try {
      const { comment_id } = req.params;
      const result = await this.commentModel.getComment(comment_id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async updateComments(req, res) {
    try {
      const { comment_id, user_tg_id } = req.params;
      const { content } = req.body;
      const comment = await this.commentModel.getComment(comment_id);
      if (!comment) {
        return res
          .status(404)
          .send({ message: "Comment not found", success: false });
      }
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (comment.user.toString() !== user._id.toString()) {
        return res.status(400).send({
          message: "You cannot edit other people's comment.",
          success: false,
        });
      }
      const result = await this.commentModel.updateComment(comment_id, {
        content,
        dateOfUpdate: new Date(),
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async deleteComment(req, res) {
    try {
      const { comment_id, user_tg_id } = req.params;
      const comment = await this.commentModel.getComment(comment_id);
      if (!comment) {
        return res
          .status(404)
          .send({ message: "Comment not found", success: false });
      }
      const post = await this.postModel.getPost(comment.post);
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (
        comment.user.toString() !== user._id.toString() &&
        post.user.toString() !== user._id.toString()
      ) {
        return res.status(400).send({
          message: "You cannot edit other people's comment.",
          success: false,
        });
      }
      await this.postModel.updatePost(comment.post, {
        comments: post.comments.filter((item) => {
          if (item !== comment_id) return true;
          else return false;
        }),
      });
      const result = await this.commentModel.deleteComment(comment_id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
}
