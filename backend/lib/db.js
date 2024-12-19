import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectDB = async () => {
    try {
        const conne = await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongoDB connected: ", conne.connection.host);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB