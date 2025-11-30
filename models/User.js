import mongoose from "mongoose";

const UserSchema =
  mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      image: { type: String },
    },
    { timestamps: true }
  );

// Fix: mongoose.models might be undefined → initialize it first
mongoose.models = mongoose.models || {};

export default mongoose.models.User || mongoose.model("User", UserSchema);
