import { PostController } from "./post.controller.mjs";
import { Router } from "express";

const PostRouter = new Router();

const postController = new PostController();

PostRouter.post("/:user_tg_id", postController.createPost.bind(postController));
PostRouter.get("/:post_id", postController.getPost.bind(postController));
PostRouter.get("/", postController.getPostByHashtags.bind(postController));
PostRouter.get(
  "/user/:user_id",
  postController.getPostByUserId.bind(postController)
);
PostRouter.patch(
  "/:post_id/:user_tg_id",
  postController.updatePost.bind(postController)
);
PostRouter.delete(
  "/:post_id/:user_tg_id",
  postController.deletePost.bind(postController)
);

export { PostRouter };
