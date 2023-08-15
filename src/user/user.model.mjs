import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  nickName: {
    required: true,
    type: String,
    unique: true,
  },
  age: {
    required: false,
    type: Number,
  },
  sex: {
    required: true,
    type: String,
  },
  telegramId: {
    unique: true,
    required: true,
    type: String,
  },
  dateOfCreation: {
    required: true,
    type: Date,
    default: new Date(),
  },
  dateOfUpdate: {
    required: false,
    type: Date,
  },
});

const User = mongoose.model("User", UserSchema);

export class UserModel {
  async createUser(user) {
    return await User.create(user);
  }
  async getUser(nickName) {
    return await User.findOne({ nickName: nickName });
  }
  async getUserByTgId(tgId) {
    return await User.findOne({ telegramId: tgId });
  }
  async getUsers(name) {
    return await User.find({ name: name }).limit(10);
  }
  async updateUser(tgId, data) {
    return await User.findOneAndUpdate({ telegramId: tgId }, data, {
      new: true,
    });
  }
  async deleteUser(tgId) {
    return await User.findOneAndDelete({ telegramId: tgId });
  }
  async deleteUsers(tgIds) {
    return await User.deleteMany({ telegramId: tgIds });
  }
}
