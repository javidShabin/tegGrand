// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/datebase.js";

const PORT = process.env.PORT || 9000;

const server = express();

// Middleware
server.use(express.json());
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(cookieParser()); // Cookie parser

// Start the server after database connection
connectDb()
  .then(() => {
    console.log("Connected to MongoDB"); // First, connect to the database
    server.listen(PORT, () => {
      // Then, start the server
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
