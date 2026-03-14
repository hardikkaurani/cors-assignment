import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createServer } from "http"
import { Server } from "socket.io"

import userRoutes from "./routes/user.routes.js"
import errorHandler from "./middleware/errorMiddleware.js"

dotenv.config()

const a = express()

/* middleware */
a.use(express.json())

a.use(cors({
  origin: process.env.CLIENT_URL
}))

/* database */
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))

/* http server create */
const httpServer = createServer(a)

/* socket server */
const io = new Server(httpServer,{
  cors:{
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"]
  }
})

/* socket connection */
io.on("connection",(socket)=>{

  console.log("User connected:",socket.id)

  socket.on("disconnect",()=>{
    console.log("User disconnected:",socket.id)
  })

})

/* test api */
a.get("/api/test",(b,c)=>{
  c.json({msg:"Backend connected successfully"})
})

/* routes */
a.use("/api/users",userRoutes)

/* error middleware */
a.use(errorHandler)

/* start server */
httpServer.listen(5000,()=>{
  console.log("Server running on port 5000")
})