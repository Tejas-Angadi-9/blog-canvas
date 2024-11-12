import Blog from "@/models/Blog"
import connectToDB from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Getting all the blogs
export const GET = async (req) => {
    try {
        await connectToDB();
        const blogs = await Blog.find({}).populate("userData").exec();
        if (blogs.length === 0) {
            return new Response(JSON.stringify({
                status: false,
                message: 'No blogs found'
            }), { status: 404 })
        }

        return new Response(JSON.stringify({
            status: true,
            message: 'Blogs found',
            totalBlogs: blogs.length,
            blogs
        }))
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while fetching all the blog posts"
        }))
    }
}

// Get all blogs created by that user
export const POST = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: "Token not found"
        }), { status: 404 })
    }
    try {
        await connectToDB();
        const decodedFromJWT = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decodedFromJWT.userId;
        // Extract userId from query parameters
        // Fetch the user with populated createdBlogs
        const user = await User.findById(userId).populate("createdBlogs").exec();
        if (!user) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "User not found"
                }),
                { status: 404 }
            );
        }
        const { password: _, ...userData } = user.toObject();

        // If user exists but has no created blogs
        if (user.createdBlogs.length === 0) {
            return new Response(
                JSON.stringify({
                    status: true,
                    message: "User hasn't created any blogs",
                }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({
                    status: true,
                    userData
                }),
                { status: 200 }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({
                status: false,
                message: err.message,
                data: "Failed to fetch user or blogs"
            }),
            { status: 500 }
        );
    }
};
