import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    reciverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String}
}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)