import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    password: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String, minlength: 5, maxlength: 20 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
