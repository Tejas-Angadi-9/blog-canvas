import { Schema, mongoose, models, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImage: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpires: {
    type: Date,
  },
  createdBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    default: []
  }],
  likedBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",

  }]
});

const User = model("User", userSchema);
export default User;
