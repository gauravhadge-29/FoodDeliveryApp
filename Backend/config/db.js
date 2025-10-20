import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async ()=>{
    console.log("Connecting to MongoDB...");
    // console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((error)=>{
        console.log("MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    });
}

export default connectDB;