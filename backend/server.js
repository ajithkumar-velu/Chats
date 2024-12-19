
import express from "express";
import { config } from "dotenv";
import connectDB from "./lib/db.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routes/MessageRouter.js";
import { app, io, server } from "./lib/socket.js";

config();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: "https://chats-frontend-xi.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Handle preflight requests
app.options('*', cors({
    origin: "https://chats-frontend-xi.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Routes
app.use('/api/user', authRouter);
app.use('/api/message', messageRouter);

app.get("/", (req, res) => {
    res.send("It's working");
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    connectDB();
});
