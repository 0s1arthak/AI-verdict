import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



// Standard practice of making routes 

// Signup -> Simple check for existing user and then other options and create user using schema and 
// then send 

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "30d"})
}


export const signup=async(req,res)=>{
    const {name,email,password,confirmPassword}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }
        if(password!==confirmPassword){
            res.json({message:"Wrong password"})
        }
        const user=await User.create({
            name:name,
            email:email,
            password:password
        })

        console.log(user)


        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
        
    } catch (error) {
        console.log("Error is",error)
    }

    



}



export const login =async(req,res)=>{
    const {email,password}=req.body
    try {
        const existing=User.findOne({email})
        if(!existing){
            res.status(400).json({message:"User does not exist , sign up first"})
        }
        if(existing && existing.matchPassword(password)){
            res.json({
                _id:existing.id,
                name:existing.name,
                email:existing.email,
                token:generateToken(existing.id)

            })
        }
        else{
            res.status(401).json({message:"Wrong email or password"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Error in logging in"})
        
    }

}



