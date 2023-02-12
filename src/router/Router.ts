import express,{Router} from "express"
import uploader from "../config/multer"
import { makeLike } from "../controller/LikeController"
import {  deletePost, getAllPost, getOnePost, makePost } from "../controller/PostController"
import { getAllUser, getOneUser, loginUser, RegisterUser } from "../controller/UserController"

const router = Router()

router.route("/register").post(RegisterUser)
router.route("/login").post(loginUser)
router.route("/post/:id").post(uploader,makePost).get(getOnePost).delete(deletePost)
router.route("/user").get(getAllUser)
router.route("/post").get(getAllPost)
router.route("/user/:id").get(getOneUser)
router.route("/post/:post/:user").post(makeLike)

export default router