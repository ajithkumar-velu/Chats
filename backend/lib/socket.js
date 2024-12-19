import express from 'express'
import { createServer } from 'http'
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://chats-frontend-virid.vercel.app/",
        credentials: true,
    }
})

const mapUser = {}

export const getReciverSocketId = (userId) =>{
    return mapUser[userId]
}

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    const userId = socket.handshake.query.userId

    if (userId) {
        mapUser[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(mapUser))

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete mapUser[userId]
        io.emit("getOnlineUsers", Object.keys(mapUser))
    })
})

export { io, server, app }
