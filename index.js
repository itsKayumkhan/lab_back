import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/attendance', attendanceRouter);

// // Default Route
// app.get((req, res) => {
//   res.send('Hello Sanjay, Your Backend is Working!');
// });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
