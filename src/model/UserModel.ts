import mongoose from "mongoose";

type UserDetails = {
    name: string,
    email: string,
    password: string,
    posts?: any[]
}

interface User extends UserDetails, mongoose.Document {}

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
},
{
    timestamps: true
})

const UserModel = mongoose.model<User>("user", userSchema)

export default UserModel