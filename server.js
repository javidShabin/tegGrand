// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 4000;

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

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})