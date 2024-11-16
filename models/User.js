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
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }],
  likedBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    unique: true
  }]
});

const User = models.User || model("User", userSchema);
export default User;
