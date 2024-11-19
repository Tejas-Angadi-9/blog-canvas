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


