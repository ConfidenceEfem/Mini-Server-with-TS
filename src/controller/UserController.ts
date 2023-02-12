import express, {Response, Request} from "express"
import UserModel from "../model/UserModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (CreateUser: any) => {
    const token = jwt.sign(
        {
             name: CreateUser.name,
             email: CreateUser.email,
             _id: CreateUser._id   
        },
        "ThisISMySecREtKey:MiniBACKeNd",
        {expiresIn: "1d"}
    )

    return token
}

export const RegisterUser = async (req: Request, res: Response) => {
    try {

        const {name, email, password} = req.body

        const findUser = await UserModel.findOne({email: email})
       
        if(!findUser){
            const saltPassword : string | number= await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, saltPassword)
            const CreateUser = await UserModel.create({
                name,email,password: hashPassword
            })  
          const token : string =   createToken(CreateUser)
    res.status(201).json({message: "user created", data: {data:CreateUser,token:token}})
        }else{
               res.status(400).json({message: "User already exists"})
        }

      
    } catch (error) {
       
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body

        const findUser = await UserModel.findOne({email})
        if(findUser){
            const checkPassword = await bcrypt.compare(password, findUser.password)
            if(checkPassword){
               const token =  createToken(findUser)
               return res.status(201).json({message: "Login Successfully", data: {data: findUser, token: token}})
            }else{
              return  res.status(400).json({message: "Incorrect email or Password"})
            }
        }else{
          return   res.status(400).json({message: "This User doesn't exists"})
        }

    } catch (error) {
      return   res.status(400).json({data: error})
    }
}

export const getAllUser = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const allUsers = await UserModel.find()
        return res.status(201).json({message: "All Users", data: allUsers})
    } catch (error) {
        return res.status(400).json({message: error})
    }
}

export const getOneUser = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const allUsers = await UserModel.findById(req.params.id).populate("posts")
        return res.status(201).json({message: "One Users", data: allUsers})
    } catch (error) {
        return res.status(400).json({message: error})
    }
}