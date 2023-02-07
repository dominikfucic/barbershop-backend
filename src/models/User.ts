import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  salt: { type: Buffer, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
