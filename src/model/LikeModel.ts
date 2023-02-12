import mongoose from "mongoose"

type LikeDetails = {
    user: any,
    post: any,
    isLiked?: boolean,

}

interface MyLike extends LikeDetails, mongoose.Document{}

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
   
},{
    timestamps: true
})

const LikeModel = mongoose.model<MyLike>("like", LikeSchema)

export default LikeModel