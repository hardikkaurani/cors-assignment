import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const a = express.Router()

/* register user */
a.post("/register", async (b,c)=>{
  try{
    const {name, email, password} = b.body

    if(!name || !email || !password){
      return c.status(400).json({msg:"All fields required"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
      return c.status(400).json({msg:"User already exists"})
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    c.status(201).json({msg:"User registered successfully", user: savedUser})

  }catch(e){
    c.status(500).json({msg:"Server error", error: e.message})
  }
})

/* login user */
a.post("/login", async (b,c)=>{
  try{
    const {email, password} = b.body

    if(!email || !password){
      return c.status(400).json({message:"Email and password required"})
    }

    const user = await User.findOne({email})
    if(!user){
      return c.status(404).json({message:"User not found"})
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password)
    if(!isPasswordMatch){
      return c.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET || "secret", {expiresIn: "7d"})

    c.json({
      msg:"Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  }catch(e){
    c.status(500).json({message:"Server error", error: e.message})
  }
})

/* get user by id */
a.get("/:id", async (b,c)=>{
  try{
    const d = await User.findById(b.params.id)

    if(!d){
      return c.status(404).json({msg:"User not found"})
    }

    c.json(d)

  }catch(e){
    c.status(500).json({msg:"Server error"})
  }
})

/* update user */
a.put("/update/:id", async (b,c)=>{
  try{
    const d = await User.findById(b.params.id)

    if(!d){
      return c.status(404).json({msg:"User not found"})
    }

    if(d.email !== b.body.email){
      return c.status(403).json({msg:"Not authorized"})
    }

    d.name = b.body.name
    await d.save()

    c.json({msg:"Profile updated",user:d})

  }catch(e){
    c.status(500).json({msg:"Server error"})
  }
})

/* delete user */
a.delete("/delete/:id", async (b,c)=>{
  try{
    const d = await User.findById(b.params.id)

    if(!d){
      return c.status(404).json({msg:"User not found"})
    }

    if(d.email !== b.body.email){
      return c.status(403).json({msg:"Not authorized"})
    }

    await d.deleteOne()
    c.json({msg:"User deleted"})

  }catch(e){
    c.status(500).json({msg:"Server error"})
  }
})

export default a
