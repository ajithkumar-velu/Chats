import express from "express"
import {config} from 'dotenv'
import connectDB from "./lib/db.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import messageRouter from "./routes/MessageRouter.js"
import { app, io, server } from "./lib/socket.js"

config()
const PORT = process.env.PORT || 2000



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://chats-frontend-virid.vercel.app"],
    credentials: true
}))

app.use('/api/user', authRouter)
app.use("/api/message", messageRouter)

server.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
    connectDB()
})
