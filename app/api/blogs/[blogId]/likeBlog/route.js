import Blog from "@/models/Blog";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDB from "@/config/database";


export const POST = async (req, { params }) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");
    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: "Token not found. Please login again"
        }), { status: 404 })
    }
    const blogId = params.blogId;
    console.log("BlogId: ", blogId)
    try {
        await connectToDB();
        const decodedData = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decodedData.userId;

        // Check if the blogId from the params exists?


        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found!'
            }), { status: 404 })
        }

        const exisitingBlog = await Blog.findById(blogId);
        const userAlreadyLiked = exisitingBlog.likedUsers.includes(userId);
        if (userAlreadyLiked) {
            return new Response(JSON.stringify({
                status: false,
                message: "User has already liked"
            }), { status: 404 })
        }
        if (!exisitingBlog) {
            return new Response(JSON.stringify({
                status: false,
                message: "Blog not found"
            }), { status: 404 })
        }

        // Push the userId in the blogs model
        await User.findByIdAndUpdate(userId, { $push: { likedBlogs: blogId } }, { new: true });
        await Blog.findByIdAndUpdate(blogId, { $push: { likedUsers: userId } }, { new: true });

        return new Response(JSON.stringify({
            status: true,
            message: "Liked a blog",
        }))
    }
    catch (err) {
        console.log('Internal server error while liking the blog')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while liking the blog post"
        }))
    }
}