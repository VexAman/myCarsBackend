import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("aman");
  });
//routes import
import userRouter from './routes/user.routes.js'
import carRouter from './routes/car.routes.js'

//routes declaration

app.use("/api/users", userRouter)
app.use("/api/cars", carRouter)



export { app }