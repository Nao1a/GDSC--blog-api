import mongoose from "mongoose";

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB...")
    } catch (error) {
        console.log("Could not connect to MongoDB...", error);
    }
}

export default connectDB;