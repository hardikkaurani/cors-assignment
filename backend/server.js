import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/user.routes.js"
import errorHandler from "./middleware/errorMiddleware.js"

dotenv.config()

const a = express()

a.use(express.json())

a.use(cors({
  origin: process.env.CLIENT_URL
}))

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))

a.get("/api/test",(b,c)=>{
  c.json({msg:"Backend connected successfully"})
})

a.use("/api/users",userRoutes)
app.use(errorHandler)

a.listen(5000,()=>{
  console.log("Server running on port 5000")
}) 
