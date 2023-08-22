import { UserController } from "./user.controller.mjs";
import { Router } from "express";

const UserRouter = Router();

const userController = new UserController();

UserRouter.post("/", userController.createUser.bind(userController));
UserRouter.patch(
  "/:telegram_id",
  userController.updateUser.bind(userController)
);
UserRouter.get("/:nick_name", userController.getUser.bind(userController));
UserRouter.get("/many/:name", userController.getUsers.bind(userController));
UserRouter.get(
  "/telegram_id/:telegram_id",
  userController.getUserByTgId.bind(userController)
);
UserRouter.delete("/", userController.deleteUsers.bind(userController));
UserRouter.delete(
  "/:user_tg_id",
  userController.deleteUser.bind(userController)
);

export { UserRouter };
