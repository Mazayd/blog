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
      console.log(user);
      const newPost = await this.postModel.createPost(dataPost);
      res.status(200).send(newPost);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPost(req, res) {
    try {
      const { post_id } = req.params;
      const post = await this.postModel.getPost(post_id);
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPostByHashtags(req, res) {
    try {
      const { hashtags } = req.body;
      const posts = await this.postModel.getPostsByHashtags(hashtags);
      if (posts.length === 0) {
        return res
          .status(404)
          .send({ message: "Post not found", success: false });
      }
      res.status(200).send(posts);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getPostByUserId(req, res) {
    try {
      const { user_id } = req.params;
      console.log(user_id);
      const posts = await this.postModel.getPostsByUserId(user_id);
      if (posts.length === 0) {
        return res
          .status(404)
          .send({ message: "Post not found", success: false });
      }
      res.status(200).send(posts);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
}
