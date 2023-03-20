import express from "express"
import { UserController } from "../controller/user.controller.mjs";
import { user } from "../middleware/user.middleware.mjs";

const userRoutes = new express.Router();
const userController = new UserController();

userRoutes.get('/test', (req, res) => {
    res.send('test completed');
})

userRoutes.post('/singupUsers', userController.singupUser.bind(userController));

userRoutes.post('/loginUser', userController.loginUser.bind(userController));

userRoutes.post('/logoutUser', user, userController.logoutUser.bind(userController));

userRoutes.post('/logoutAll', user, userController.logoutAll.bind(userController));

export { userRoutes };