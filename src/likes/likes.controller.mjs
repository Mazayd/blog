import { CommentModel } from "../comment/comment.model.mjs";
import { UserModel } from "../user/user.model.mjs";
import { PostModel } from "../post/post.model.mjs";

export class LikesController {
  constructor() {
    this.commentModel = new CommentModel();
    this.userModel = new UserModel();
    this.postModel = new PostModel();
  }
  async likesFromPost(req, res) {
    try {
      const { user_tg_id, post_id } = req.params;
      const post = await this.postModel.getPost(post_id);
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (post.likes.includes(user._id.toString())) {
        const index = post.likes.findIndex((id) => {
          if (id === user._id.toString()) return true;
        });
        post.likes.splice(index, 1);
        const result = await this.postModel.updatePost(post_id, {
          numberOfLikes: post.numberOfLikes - 1,
          likes: post.likes,
        });
        return res.status(200).send(result);
      } else {
        const result = await this.postModel.updatePost(post_id, {
          numberOfLikes: post.numberOfLikes + 1,
          likes: [...post.likes, user._id.toString()],
        });
        return res.status(200).send(result);
      }
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async likesFromComment(req, res) {
    try {
      const { user_tg_id, comment_id } = req.params;
      const comment = await this.commentModel.getComment(comment_id);
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (comment.likes.includes(user._id.toString())) {
        const index = comment.likes.findIndex((id) => {
          if (id === user._id.toString()) return true;
        });
        comment.likes.splice(index, 1);
        const result = await this.commentModel.updateComment(comment_id, {
          numberOfLikes: comment.numberOfLikes - 1,
          likes: comment.likes,
        });
        return res.status(200).send(result);
      } else {
        const result = await this.commentModel.updateComment(comment_id, {
          numberOfLikes: comment.numberOfLikes + 1,
          likes: [...comment.likes, user._id.toString()],
        });
        return res.status(200).send(result);
      }
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
}
