import express from 'express'
import { productAuth } from '../middleware/authMiddleware.js'
import { getAllUsers, getMessage, sendMessage } from '../controller/messageController.js'

const messageRouter = express.Router()

messageRouter.post("/sidebar-users", productAuth, getAllUsers)
messageRouter.post("/send/:id", productAuth, sendMessage)
messageRouter.post("/:id", productAuth, getMessage)

export default messageRouter