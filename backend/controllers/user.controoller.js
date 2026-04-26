export const registerUser = async (req,res,next)=>{
  try{

    const {name,email,password} = req.body

    res.json({
      msg:"User registered",
      user:{name,email}
    })

  }catch(err){
    next(err)
  }
}

export const loginUser = async (req,res,next)=>{
  try{

    const {email,password} = req.body

    res.json({
      msg:"User logged in",
      email
    })

  }catch(err){
    next(err)
  }
}