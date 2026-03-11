import mongoose from "mongoose"

const a = new mongoose.Schema({
  name:String,
  email:String,
  password:String
})

export default mongoose.model("User",a)