# Product Management System

## 🔍 Project Description

The **Product Management System** is designed to simplify and automate the process of managing products, users, and their data. Built with Node.js, Express, and MongoDB, this backend project supports authentication, file uploads, and RESTful APIs.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT), bcrypt
- **File Handling**: Multer
- **Environment Management**: dotenv
- **Development Tools**: nodemon

Architecture: MVC architecture (Model–View–Controller)

## Dependencies

-- **express: Create and manage the Express server.
-- **bcrypt: Hash user passwords securely.
-- **cookie-parser: Parse cookies attached to the client request.
-- **cors: Enable Cross-Origin Resource Sharing to protect the server from unauthorized requests.
-- **dotenv: Manage and hide sensitive environment variables (like secret keys).
-- **jsonwebtoken: Generate and verify encrypted tokens for user authentication.
-- **mongoose: Connect and interact with MongoDB using schemas.
-- **multer: Handle file uploads in the backend.
-- **cloudinary: Upload and transform media files, then serve them via a secure URL.
-- **nodemon: Automatically restart the server during development on file changes.

### Notes

To properly set up the database connection and start the server, make sure that the MongoDB connection is established before the server starts listening for incoming requests. This is important to avoid running the server without a valid database connection. Below is the code to connect to MongoDB and start the server:

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
