import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Itemmodel from "./model/item.js";
import Usermodel from "./model/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_USER_NAME = process.env.KEY1;
const MONGO_PASSWORD = process.env.KEY2;

app.use(express.json());
app.use(cors());

const CONNECTION_URL = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@cluster0.7wdqb.mongodb.net/apiData?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL).then(() => console.log("mongoDB接続成功"));

app.get("/", (req, res) => {
  console.log("itemリスト");
  res.send("itemリスト");
});

app.post("/user/register", async (req, res) => {
  const userData = req.body;
  const user = new Usermodel({
    _id: new mongoose.Types.ObjectId(),
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    engineerType: userData.engineerType,
  });

  user
    .save()
    .then((saveResult) => {
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          _id: saveResult._id,
          userName: saveResult.userName,
          email: saveResult.email,
          password: saveResult.password,
          engineerType: saveResult.engineerType,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
app.post("/user/login", async (req, res) => {
  const loginUserData = req.body;
  const user = await Usermodel.find({
    email: loginUserData.email,
    password: loginUserData.password,
  });
  if (user.length === 0) {
    res.status(404);
    return;
  }
  // 対象のuserは1人のみのためindex0指定
  res.status(200).json(user[0]);
});

app.post("/user/logout", (req, res) => {
  // ログイン/ログアウトにはexpress-sessionが必要か検討
  res.status(200).send("success");
});

app.get("/itemList", async (req, res) => {
  try {
    const Items = await Itemmodel.find({});
    res.status(200).json(Items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.listen(PORT, console.log(`${PORT}番サーバー起動中`));
