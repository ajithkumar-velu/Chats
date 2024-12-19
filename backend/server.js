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
app.use(cors(
    {
        
    credentials: true
    }
))


app.use('/api/user', authRouter)
app.use("/api/message", messageRouter)

app.get("/", (req, res)=>{
    res.send("It's working")
})

server.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
    connectDB()
})
