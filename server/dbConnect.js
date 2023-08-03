import mongoose from "mongoose";

const url = process.env.DB_URL
async function dbConnect(){
    try {
        await mongoose.connect(url)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

dbConnect()