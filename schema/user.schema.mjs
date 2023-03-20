import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import validator from "validator";

const UserSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 18
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        require: true,
        default: new Date
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minLength: 4,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//login in user
UserSchema.statics.findByCredetians = async (email, password) => {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password)

    if (!user) {
        throw new Error('Unable to login');
    }
    if (!isMatch) {
        throw new Error('Unable to lo gin');
    }

    return user;
}

//generate token
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = Jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//hash password
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

export const User = mongoose.model('User', UserSchema);