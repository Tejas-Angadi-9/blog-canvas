import Blog from "@/models/Blog"
import connectToDB from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Get all blogs created by that user
export const GET = async (req) => {
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