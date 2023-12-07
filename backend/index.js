import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  } else
   console.log("Connected to MySQL successfully");
});

app.listen(PORT, () => {
  console.log("backend application is  rinning on port " + PORT);
});
