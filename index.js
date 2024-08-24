import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "http2";
import connectDB from "./config/database.js";


dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());


connectDB();

const port = process.env.PORT 
app.listen(console.log("server listening on port " + port))