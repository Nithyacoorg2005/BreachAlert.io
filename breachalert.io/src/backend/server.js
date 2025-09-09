import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // must come before using process.env

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Mongo URI:", process.env.MONGO_URI); // ✅ debug

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
