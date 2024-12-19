import jwt from 'jsonwebtoken'
import { User } from '../models/userMode.js'
export const productAuth = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt

        if(!token) return res.status(401).json({message: "Unauthorized - Token not Provided "})
        
        const check = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!check) return res.status(400).json({ message: "Unauthorized - Ivalid Token"})
        
        const user = await User.findById(check.userId).select("-password")

        req.user = user

        next()
        
    } catch (error) {
        console.log("Error in productAuth: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
