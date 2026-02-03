import mongoose from "mongoose";

const connectToDatabase = async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    }
    catch(error){
        console.log("DB connection Error" , error.message);
    }
}

export default connectToDatabase;