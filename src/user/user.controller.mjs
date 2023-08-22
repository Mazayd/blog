import { UserModel } from "./user.model.mjs";

export class UserController {
  constructor() {
    this.userModel = new UserModel();
  }
  async createUser(req, res) {
    try {
      const newUser = req.body;
      const user = await this.userModel.getUser(newUser.nickName);
      if (user) {
        return res
          .status(400)
          .send({ message: "This nickname is already taken.", success: false });
      }
      const result = await this.userModel.createUser(newUser);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async updateUser(req, res) {
    try {
      const { telegram_id } = req.params;
      const { name, age, sex, nickName } = req.body;
      const user = await this.userModel.getUser(nickName);
      if (user) {
        return res
          .status(403)
          .send({ message: "This nickname is already taken.", success: false });
      }
      const result = await this.userModel.updateUser(telegram_id, {
        name,
        age,
        sex,
        nickName,
      });
      if (!result) {
        return res
          .status(403)
          .send({ message: "User not found", success: false });
      }
      res.status(200).send(result);
    } catch (Error) {
      res.status(400).send({ err: err });
    }
  }
  async getUser(req, res) {
    try {
      const { nick_name } = req.params;
      const result = await this.userModel.getUser(nick_name);
      if (!result) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async getUserByTgId(req, res) {
    try {
      const { telegram_id } = req.params;
      const result = await this.userModel.getUserByTgId(telegram_id);
      if (!result) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getUsers(req, res) {
    try {
      const { name } = req.params;
      const result = await this.userModel.getUsers(name);
      if (result.length === 0) {
        return res.status(404).send({
          message: "A user with this name does not exist.",
          success: false,
        });
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async deleteUsers(req, res) {
    try {
      const { users_tg_id } = req.body;
      const result = await this.userModel.deleteUsers(users_tg_id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  async deleteUser(req, res) {
    try {
      const { user_tg_id } = req.params;
      const result = await this.userModel.deleteUser(user_tg_id);
      if (!result) {
        return res
          .status(403)
          .send({ message: "Such user does not exist.", success: false });
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
}
