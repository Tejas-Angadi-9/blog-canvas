import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const PATCH = async (req) => {
    const { updatedName } = await req.json();
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

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 });
        }

        // If the user exists then, pick the profileImage from the exisitingUser and check it's type and make sure it is a string. And check it's domain part
        const profileImg = existingUser.profileImage;

        const noProfileImage = profileImg.includes("https://api.dicebear.com/9.x/initials/svg?seed=")
        console.log("Includes?: ", noProfileImage);

        if (!noProfileImage) {
            return new Response(JSON.stringify({
                status: false,
                message: "Profile Image is present",
            }), { status: 404 })
        }

        await existingUser.updateOne({ profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${updatedName}` }, { new: true })

        return new Response(JSON.stringify({
            status: true,
            message: "No profile Image found"

        }), { status: 200 })

    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server issue while checking the user profile's image"
        }), { status: 500 });
    }
}