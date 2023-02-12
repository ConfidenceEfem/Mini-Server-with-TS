import {Response, Request, NextFunction} from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary"
import PostModel from "../model/PostModel"
import UserModel from "../model/UserModel"

// export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
//    const authToken = req.headers.authorization
//    const token = authToken?.split(" ")[1]
//    if(token){
//     jwt.verify(token, "ThisISMySecREtKey:MiniBACKeNd", (err,payload) : void =>{
//         if(err){
//             res.status(400).json({message: err.message})
//         }else{
//              let myUser : any =  payload
//              return myUser
//             next()
//         }
//     })
//    }else{
//     res.status(400).json({message: "Access Token not Found"})
//    }
// }


export const makePost = async (req: Request, res: Response) => {
    try {
        const {content} = req.body
        const findUser: any = await UserModel.findById(req.params.id)
        const getFile: string | any = req.file?.path
        const uploadImage = await cloudinary.uploader.upload(getFile)

       const newPost = new PostModel({
        content,
        user: findUser?._id,
        image: uploadImage.secure_url,
       })

       newPost.save()

        findUser?.posts?.push(new mongoose.Types.ObjectId(newPost._id))
        await findUser.save()

        res.status(201).json({message: "Post created", data: newPost})

    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const getAllPost = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const allPost = await PostModel.find().populate("likes")
        return res.status(201).json({message: "All Post", data: allPost})
    } catch (error) {
        return res.status(400).json({message: error})
    }
}

export const getOnePost = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const OnePost = await PostModel.findById(req.params.id)
        return res.status(201).json({message: "One Post", data: OnePost})
    } catch (error) {
        return res.status(400).json({message: error})
    }
}

export const deletePost = async (req: Request, res: Response) : Promise<Response> => {
    try {
        
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id)
        const findUser : any = await UserModel.findById(deletedPost?.user)
        await findUser?.posts.pull(deletedPost)
        findUser.save()

        return res.status(201).json({message: "Deleted successfully", data: deletedPost})

    } catch (error) {
        return res.status(400).json({message: error})
    }
}