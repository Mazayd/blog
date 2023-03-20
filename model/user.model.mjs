import { User } from "../schema/user.schema.mjs";

export class UserModel {
    async getUser (code) {
        return await User.findOne(code);
    }
}

