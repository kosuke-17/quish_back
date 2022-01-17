import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Itemmodel from "./model/item.js";

dotenv.config();

const app = express();
const PORT = 6000;
const MONGO_USER_NAME = process.env.KEY1;
const MONGO_PASSWORD = process.env.KEY2;

app.use(cors());

const CONNECTION_URL = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@cluster0.7wdqb.mongodb.net/apiData?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL).then(() => console.log("mongoDB接続成功"));

app.get("/itemList", async (req, res) => {
  console.log("itemリスト");
  try {
    const Items = await Itemmodel.find({});
    res.status(200).json(Items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.listen(PORT, console.log(`${PORT}番サーバー起動中`));
