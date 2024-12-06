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
  createdBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }],
  likedBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }]
});

const User = models.User || model("User", userSchema);
export default User;
