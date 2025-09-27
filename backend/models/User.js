import mongoose from "mongoose";
import { hashMiddlewarePassword } from "../middleware/usermiddleware.js";


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        // required:true,
    },
    
},{timestamps:true})


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



UserSchema.pre("save",hashMiddlewarePassword)

const User=mongoose.model("User",UserSchema)


export default User