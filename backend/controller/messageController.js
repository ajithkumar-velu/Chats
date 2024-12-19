import { getReciverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userMode.js";

export const getAllUsers = async (req, res) =>{

    try {
        const logedUser = req.user
                
        const users = await User.find({_id: {$ne:logedUser}}).select("-password")
        res.json(users)

    } catch (error) {
        console.log("Error in getAllUsers controller: ", error.message);
        res.status(500).json("Internal Server Error")
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const senderId = req.user._id
        const reciverId = req.params.id
        const { text } = req.body

        if(!text) return res.status(401).json({message: "Please enter a message"})
        
        const newMessage = new Message({
            senderId,
            reciverId,
            text
        })

        await newMessage.save()

        const reciverSocketId = getReciverSocketId(reciverId)

        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }
        
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in SendMessage controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMessage = async (req, res) =>{
    try {
        const senderId = req.user._id
        const reciverId = req.params.id

        const allMessage = await Message.find({$or: [
            {senderId: senderId, reciverId: reciverId},
            {senderId: reciverId, reciverId: senderId},
        ]}).sort({createdAt:1})

        res.status(200).json(allMessage)
        
    } catch (error) {
        console.log("Error in GetMessage controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

