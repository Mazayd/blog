import { Router } from "express";
import { LikesController } from "./likes.controller.mjs";

const LikesRouter = new Router();
const likesController = new LikesController();

LikesRouter.post(
  "/post/:post_id/:user_tg_id",
  likesController.likesFromPost.bind(likesController)
);
LikesRouter.post(
  "/comment/:comment_id/:user_tg_id",
  likesController.likesFromComment.bind(likesController)
);
export { LikesRouter };
