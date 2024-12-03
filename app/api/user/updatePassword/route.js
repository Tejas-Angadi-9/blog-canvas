import User from "@/models/User";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDB from "@/config/database";

export const PATCH = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Token not found. Please login'
        }), { status: 404 })
    }
    const { oldPassword, newPassword, confirmNewPassword } = await req.json();

    try {
        await connectToDB();
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return new Response(JSON.stringify({
                status: false,
                message: "Fill all the required fields"
            }), { status: 400 })
        }

        const exisitingUser = await User.findById(userId);

        if (!exisitingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found"
            }), { status: 404 })
        }
        const passwordMatches = await bcrypt.compare(oldPassword, exisitingUser.password);
        if (!passwordMatches) {
            return new Response(JSON.stringify({
                status: false,
                message: "Doesn't match the old password"
            }), { status: 404 })
        }

        if (newPassword !== confirmNewPassword) {
            return new Response(JSON.stringify({
                status: false,
                message: "New password and confirm password doesn't match"
            }), { status: 404 })
        }

        const sameAsOldPassword = await bcrypt.compare(newPassword, exisitingUser.password);
        if (sameAsOldPassword === true) {
            return new Response(JSON.stringify({
                status: false,
                message: "New password can't be same as old password"
            }), { status: 403 })
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        await exisitingUser.updateOne({ password: newHashedPassword });

        return new Response(JSON.stringify({
            status: true,
            message: "Passwords updated successfully!"
        }))
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while editing the profile details"
        }))
    }


}