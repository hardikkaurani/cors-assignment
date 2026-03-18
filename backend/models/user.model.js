import mongoose from "mongoose"

const a = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: String
})

export default mongoose.model("User",a)