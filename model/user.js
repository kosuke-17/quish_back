import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  engineerType: { type: String, required: true },
});

export default mongoose.model("users", userSchema);
