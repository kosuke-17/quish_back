import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  _id: String,
  userId: Number,
  title: String,
  content: String,
  tags: Array,
});

export default mongoose.model("itemLists", itemSchema);
