import { Schema, mongoose, models, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  description: {
    type: String,
    required: [true, "Blog description is required"],
  },
  blogImage: {
    type: String,
  },
  tag: {
    type: String,
    required: [true, "Blog Tag is required"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;
