import cloudinary from "cloudinary"

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file provided" })
    }

    const result = await cloudinary.v2.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ msg: "Upload failed", error: error.message })
        }
        res.json({ secure_url: result.secure_url })
      }
    ).end(req.file.buffer)

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}
