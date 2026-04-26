
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createServer } from "http"
import { Server } from "socket.io"
import jwt from "jsonwebtoken"

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { buildHealthResponse } from "./utils/healthResponse.js";


import userRoutes from "./routes/user.routes.js"
import { createPostRoutes } from "./routes/post.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
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

/* socket authentication middleware */
io.use((socket,next)=>{

  const token = socket.handshake.auth.token

  if(!token){
    return next(new Error("Authentication error"))
  }

  try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET || "secret")

    socket.user = decoded

    next()

  }
  catch(err){
    next(new Error("Invalid token"))
  }

})

/* socket connection */
io.on("connection",(socket)=>{

  console.log("User connected:",socket.user.email)

  socket.on("disconnect",()=>{
    console.log("User disconnected:",socket.user.email)
=======
a.use(
  cors({
    origin: process.env.CLIENT_URL,

  })


})

/* test api */
a.get("/api/test",(b,c)=>{
  c.json({msg:"Backend connected successfully"})
})

/* routes */
a.use("/api/users",userRoutes)
a.use("/api/posts", createPostRoutes(io))
a.use("/api/upload", uploadRoutes)

/* error middleware */
a.use(errorHandler)

/* start server */
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

a.get("/api/test", (b, c) => {
  c.json(buildHealthResponse());
});

a.listen(5000, () => {
  console.log("Server running on port 5000");
});

