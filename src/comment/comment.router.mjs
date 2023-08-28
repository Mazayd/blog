import { Router } from "express";
import { CommentController } from "./comment.controller.mjs";

const commentController = new CommentController();
const CommentRouter = new Router();

CommentRouter.post(
  "/:user_tg_id/:post_id",
  commentController.createComment.bind(commentController)
);
CommentRouter.get(
  "/:post_id",
  commentController.getComments.bind(commentController)
);
CommentRouter.get(
  "/one/:comment_id",
  commentController.getCommentById.bind(commentController)
);
CommentRouter.patch(
  "/:user_tg_id/:comment_id",
  commentController.updateComments.bind(commentController)
);
CommentRouter.delete(
  "/:user_tg_id/:comment_id",
  commentController.deleteComment.bind(commentController)
);

export { CommentRouter };
