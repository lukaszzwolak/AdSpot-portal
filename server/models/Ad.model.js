import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 10, maxlength: 50 },
    content: { type: String, required: true, minlength: 20, maxlength: 1000 },
    date: { type: Date, default: Date.now },
    photo: { type: String },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
