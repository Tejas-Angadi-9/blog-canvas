import jwt from "jsonwebtoken";
import { cookies } from "next/headers"
import User from "@/models/User";

export const POST = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")

    try {
        // Extract userId from the request body
        if (!token) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Token not found, Please login!'
            }), { status: 404 })
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find and delete the user by userId
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 });
        }

        cookieStore.delete("authToken");
        cookieStore.delete("vamos");

        return new Response(JSON.stringify({
            status: true,
            message: "User logged out successfully!"
        }), { status: 200 });
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server issue while logging out the user"
        }), { status: 500 });
    }
}