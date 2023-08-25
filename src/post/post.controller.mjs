import { PostModel } from "./post.model.mjs";
import { UserModel } from "../user/user.model.mjs";

export class PostController {
  constructor() {
    this.postModel = new PostModel();
    this.userModel = new UserModel();
  }
  async createPost(req, res) {
    try {
      const { user_tg_id } = req.params;
      const dataPost = req.body;
      const user = await this.userModel.getUserByTgId(user_tg_id);
      dataPost.user = user._id;
      const result = await this.postModel.createPost(dataPost);
      const newPost = [result._id.toString() || [], ...(user.posts || [])];
      await this.userModel.updateUser(user_tg_id, {
        posts: newPost,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPost(req, res) {
    try {
      const { telegram_id } = req.params;
      const user = await this.userModel.getUserByTgId(telegram_id);
      const post = await this.postModel.getPostsByUserId(user._id);
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPostByHashtags(req, res) {
    try {
      const { hashtags } = req.body;
      const posts = await this.postModel.getPostsByHashtags(hashtags);
      res.status(200).send(posts);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPostByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const posts = await this.postModel.getPostsByUserId(user_id);
      res.status(200).send(posts);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async updatePost(req, res) {
    try {
      const { post_id, user_tg_id } = req.params;
      const { content, hashtags } = req.body;
      const post = await this.postModel.getPost(post_id);
      if (!post) {
        return res
          .status(404)
          .send({ message: "Post not found", success: false });
      }
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (post.user.toString() !== user._id.toString()) {
        return res.status(400).send({
          message: "You cannot edit other people's posts.",
          success: false,
        });
      }
      const result = await this.postModel.updatePost(post_id, {
        content,
        hashtags,
        dateOfUpdate: new Date(),
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async deletePost(req, res) {
    try {
      const { post_id, user_tg_id } = req.params;
      const post = await this.postModel.getPost(post_id);
      if (!post) {
        return res
          .status(404)
          .send({ message: "Post not found", success: false });
      }
      const user = await this.userModel.getUserByTgId(user_tg_id);
      if (post.user.toString() !== user._id.toString()) {
        return res.status(400).send({
          message: "You cannot delete other people's posts.",
          success: false,
        });
      }
      const result = await this.postModel.deletePost(post_id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
}
