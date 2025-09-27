import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


const connectDB=async()=>{
    try {
        const dbconnection=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected with ${(await dbconnection).connection.host}`)
        
    } catch (error) {
        console.log("There is an error while connecting to MongoDB",error)
        
    }
}

export default connectDB