import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5180", "http://localhost:5179"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
