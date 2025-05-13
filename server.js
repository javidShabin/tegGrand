// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/datebase.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";

const PORT = 9000;

const server = express();

// Middleware
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(cookieParser()); // Cookie parser

server.get("/", (req, res) => {
  res.send("Hello, World!");
});


// Api router
server.use("/api", apiRouter)


server.use(errorHandler);

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
