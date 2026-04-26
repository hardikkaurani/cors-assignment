import mongoose from "mongoose"

const a = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected")
  }catch{
    console.log("DB error")
  }
}

export default a