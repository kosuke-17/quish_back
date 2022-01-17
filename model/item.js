import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  type: String,
  image: String,
  color: String,
  description: String,
});

export default mongoose.model("itemLists", itemSchema);
