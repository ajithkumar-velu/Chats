import e from "express";
import { check, login, logout, profile, signup, updateName } from '../controller/authUser.js'
import { productAuth } from "../middleware/authMiddleware.js";
const authRouter = e.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/logout', logout)

authRouter.post('/check', productAuth, check)
authRouter.put("/update-profile", productAuth, profile)
authRouter.put("/edit-name", productAuth, updateName)
export default authRouter