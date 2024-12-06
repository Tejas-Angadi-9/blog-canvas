import User from "@/models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const GET = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Token not found, Please login!'
        }), { status: 404 })
    }

    try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid user ID format"
            }), { status: 400 });
        }

        // Find and delete the user by userId
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            status: true,
            userData: existingUser,
            message: "Successfully fetched User's details"
        }))
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server issue while deleting the user profile"
        }), { status: 500 });
    }
}

export const DELETE = async (req) => {
    try {
        // Extract userId from the request body
        const cookieStore = cookies();
        const token = cookieStore.get("authToken")
        if (!token) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Token not found, Please login!'
            }), { status: 404 })
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid user ID format"
            }), { status: 400 });
        }

        // Find and delete the user by userId
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 });
        }

        cookieStore.delete("authToken");
        await existingUser.deleteOne();

        return new Response(JSON.stringify({
            status: true,
            message: "User profile deleted successfully!"
        }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server issue while deleting the user profile"
        }), { status: 500 });
    }
};