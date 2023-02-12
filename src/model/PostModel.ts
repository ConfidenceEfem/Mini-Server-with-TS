import mongoose, { model,  Schema } from "mongoose";

type PostDetails = {
    content:string,
    image: string,
    likes?: any[],
    user: string,
}

interface post extends PostDetails, mongoose.Document{}

const PostSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "like"
        }
    ]
},{
    timestamps: true
})

const PostModel = model<post>("post", PostSchema)

export default PostModel