import { configDotenv } from "dotenv";
configDotenv()
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const registerUser = async (req,res)=>{
const{username,email,password,role='user'}= req.body
const isUser = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
})
    if(isUser){
        console.log("problem")
        return res.status(409).json({message:'user already exists'})
      
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password :hash,
        role
    })
    const token =await jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:'user created successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    }

    )

};
async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (!user) {
        return res.status(401).json({ message: "Invalid Credential" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password

    );
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid Credential" });
    }
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
            });
        res.status(200).json({
        message: "login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });

}
export {registerUser, loginUser};