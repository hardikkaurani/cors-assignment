function errorHandler(err, req, res, next){

  const a = err.message || "Server Error"

  res.status(err.status || 500).json({
    success:false,
    message:a
  })

}

export default errorHandler