import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "http2";
import connectDB from "./config/database.js";
import userroutes from "./routes/userroutes.js"


dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());


connectDB();


app.use("/api", userroutes)


const port = process.env.PORT 
app.listen(console.log("server listening on port " + port)) 