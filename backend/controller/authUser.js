import { User } from "../models/userMode.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateToken } from "../lib/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !password || !email) return res.status(400).json({ message: "Please fill in all fields" })

        if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 chatacters" })

        const user = await User.findOne({ email })        

        if (user) return res.status(400).json({ message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        

        const newUser = new User({
            name,
            password: hashedPassword,
            email
        })
        
        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profile: newUser.profile 
            })
        }else{
            res.status(400).json({message: "Invalid data"})
        }        

    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        
        if(!email || !password) return res.status(400).json({message: "Invalid credentials"})
        
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message: "Invalid creditionals"})

        const passwordCheck = await bcrypt.compare(password, user.password)

        if(!passwordCheck){
            return res.status(400).json({message: "Invalid creditionals"})
        }

        generateToken(user._id, res)

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            profile: user.profile
        })

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = async (req, res) =>{
    try {
        
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logout successfully"})

    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const check = async (req, res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in check controller: ", error.message);
        res.status(500).json("Internal Server Error")
    }
}

export const profile = async (req, res) =>{
    try {
        const { profile } = req.body;
        const userId = req.user._id
        if(!profile) return res.status(400).json({message: "Please select an Image!"})

        const image = await cloudinary.uploader.upload(profile)

        const imageUrl = image.secure_url

        const updatedUser = await User.findByIdAndUpdate(userId, {profile: imageUrl}, {new: true})

        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log("Error in profile controller: ", error.message);
        res.status(500).json({message: "Internal Server Error."})
    }
}

export const updateName = async (req, res) =>{
    try {
        const { name } = req.body;
        const userId = req.user._id
        if ( !name ) return res.status(400).json({message: "Name required"})

        const user = await User.findByIdAndUpdate(userId, {name: name}, {new: true}).select("-password")
        
        await user.save()
        res.status(201).json(user)
        
    } catch (error) {
        console.log("Error in updateName: ", error.message);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

