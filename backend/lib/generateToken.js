import jwt from 'jsonwebtoken'

export const generateToken = async (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"})

    res.cookie('jwt', token)
        
    return token
}
