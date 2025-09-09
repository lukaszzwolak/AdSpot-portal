import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
  expires: { type: Date, required: true },
  session: { type: String, required: true },
});
export default mongoose.model("Session", sessionSchema, "sessions");
