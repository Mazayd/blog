import { UserModel } from "../model/user.model.mjs";
import { User } from "../schema/user.schema.mjs";

export class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    async singupUser(req, res) {
        try {

            const emailNewUser = req.body.email;
            const validEmail = await this.userModel.getUser({ email: emailNewUser });

            if (validEmail) {
                res.send('User with this email is already registered')
            } else {
                const user = new User(req.body);
                await user.save();
                const token = await user.generateAuthToken();
                res.status(201).send({ user, token });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async loginUser(req, res) {
        try {
            const user = await User.findByCredetians(req.body.email, req.body.password);
            const token = await user.generateAuthToken();

            res.send({ user, token });
        } catch (error) {
            res.status(400).send('wrong login or password');
        }
    }

    async logoutUser (req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            })
            await req.user.save();
            res.send('Done');
        } catch (error) {
            res.status(500);
        }
    }

    async logoutAll (req, res) {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.send('Done');
        } catch {
            res.status(500);
        }
    }
}