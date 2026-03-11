import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

const a = express.Router()

a.post("/register", async (b,c)=>{

  const {name,email,password} = b.body

  const d = await bcrypt.hash(password,10)

  const e = await User.create({
    name,
    email,
    password:d
  })

  c.json({msg:"User registered",user:e})
})

export default a