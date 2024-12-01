import connectToDB from "@/config/database";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cloudinaryUploader from "@/services/cloudinaryUploader";

export const PATCH = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");
    const inputData = await req.formData();

    const name = inputData.get("name")
    const profileImage = inputData.get("profileImage");

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
        const userId = decoded.userId;
        const existingUser = await User.findById(userId).populate("createdBlogs").exec();
        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 })
        }

        if (name) {
            await existingUser.updateOne({ name: name });
        }

        if (profileImage) {
            const buffer = Buffer.from(await profileImage.arrayBuffer());
            // Directly upload the image to Cloudinary
            const imageUploadResult = await cloudinaryUploader(buffer, "Blog-Canvas");

            await existingUser.updateOne(
                {
                    profileImage: imageUploadResult.secure_url,
                }
            );
        }

        const updatedUser = await User.findById(userId).populate("createdBlogs").exec();
        const { password: _, ...profileDetails } = updatedUser.toObject();

        return new Response(JSON.stringify({
            status: true,
            message: "Successfully updated the profile image",
            userData: profileDetails
        }), { status: 201 })
    }
    catch (err) {
        console.log('Internal server error while updating the profile image');
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while updating the profile image"
        }), { status: 500 })
    }
}
