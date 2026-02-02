// import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./DataBAse/Db.js";

import dotenv from 'dotenv';
dotenv.config()

const registerAdmin = async () => {
    try {
        connectToDatabase()
        
        const hashpassword = await bcrypt.hash("admin", 10)
        const newAdmin = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashpassword,
            role: "admin",
        })
        await newAdmin.save()
        console.log("Admin ID created")
    }
    catch (error) {
        console.log(error)
    }
}

export default registerAdmin()