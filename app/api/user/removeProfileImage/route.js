import connectToDB from "@/config/database";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import User from "@/models/User";

export const PATCH = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Token not found. Please login'
        }), { status: 404 })
    }
    try {
        await connectToDB();
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        if (!decoded) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Token has expired. Please login again'
            }), { status: 404 })
        }
        // Storing the userId from the payload data
        const userId = decoded.userId;
        // Validating whether the user is signed up or not
        const existingUser = await User.findById(userId).populate("createdBlogs").exec();
        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 })
        }

        await existingUser.updateOne({ $unset: { profileImage: null } });
        const updatedUser = await User.findById(userId).populate("createdBlogs").exec();

        const { password: _, ...profileDetails } = updatedUser.toObject();
        return new Response(JSON.stringify({
            status: true,
            message: "Successfully removed the profile image",
            userData: profileDetails
        }), { status: 201 })
    }
    catch (err) {
        console.log('Internal server while removing the profile image')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server while removing the profile image"
        }))
    }
}