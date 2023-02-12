import express, {Application,Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./router/Router"

const app: Application = express()

const port : string | number = 3002

const url = "mongodb://0.0.0.0:27017/MiniBackend"

mongoose.set("strictQuery", true)
mongoose.connect(url).then(()=>{
    console.log("Connected to DB")
})

app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to a Mini Backend")
    console.log("Welcome")
})

app.use("/", router)

app.listen(port, ()=>{
    console.log("Listening to port", port)
})