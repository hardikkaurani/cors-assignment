import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const a = express();

a.use(express.json());

a.use(
  cors({
    origin: process.env.CLIENT_URL, 
  })
);

a.get("/api/test", (b, c) => {
  c.json({ msg: "Backend connected successfully 🚀" }); 
});

a.listen(5000, () => {
  console.log("Server running on port 5000");
});