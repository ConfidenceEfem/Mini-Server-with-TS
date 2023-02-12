import {Response, Request, NextFunction} from "express"
import mongoose from "mongoose"
import LikeModel from "../model/LikeModel"
import PostModel from "../model/PostModel"
import UserModel from "../model/UserModel"




export const makeLike = async (req: Request, res: Response) => {
    try {


        const findPost : any = await PostModel.findById(req.params.post)

        const findUser = await UserModel.findById(req.params.user)

        const newLike = new LikeModel({
            user: findUser?._id,
            post: findPost?._id,
            isLiked: true
        })

        newLike.save()

        await findPost?.likes?.push(new mongoose.Types.ObjectId(findUser?._id))
        findPost.save()

        return res.status(201).json({message: "Liked", data: newLike})

    } catch (error) {
        res.status(400).json({message: error})
    }
}
