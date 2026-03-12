a.put("/update/:id", async (b,c)=>{

  const d = await User.findById(b.params.id)

  if(!d){
    return c.status(404).json({msg:"User not found"})
  }

  if(d.email !== b.body.email){
    return c.status(403).json({msg:"Not authorized"})
  }

  d.name = b.body.name

  await d.save()

  c.json({msg:"Updated",user:d})

})

a.delete("/delete/:id", async (b,c)=>{

  const d = await User.findById(b.params.id)

  if(!d){
    return c.status(404).json({msg:"User not found"})
  }

  if(d.email !== b.body.email){
    return c.status(403).json({msg:"Not authorized"})
  }

  await d.deleteOne()

  c.json({msg:"User deleted"})

})