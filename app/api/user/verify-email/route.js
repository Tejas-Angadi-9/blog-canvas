import connectToDB from "@/config/database"
import User from "@/models/User"
import Verification from "@/models/Verification"
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    const { token } = await req.json();

    // Validate input
    if (!token) {
        return new Response(
            JSON.stringify({
                status: false,
                message: "Token field is not present.",
            }),
            { status: 400 }
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const email = decoded.email;
    const name = decoded.name;
    const password = decoded.hashedPassword;

    try {
        await connectToDB();

        // Fetch the verification entry
        const existingToken = await Verification.findOne({ email });
        if (!existingToken) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Verification Token not found. Please sign-up again.",
                }),
                { status: 404 }
            );
        }

        // Token expiration check
        const expiresAt = new Date(existingToken.expiresAt).getTime();
        if (Date.now() > expiresAt) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Token has expired.",
                }),
                { status: 401 } // Unauthorized
            );
        }

        // Token match check
        if (existingToken.token !== token) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Invalid token.",
                }),
                { status: 403 } // Forbidden
            );
        }

        await User.create({
            name: name,
            email: email,
            password: password,
            profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`
        })

        // Success: Token is valid
        await existingToken.deleteOne(); // Clean up the verification entry
        return new Response(
            JSON.stringify({
                status: true,
                message: "Email validated successfully.",
            }),
            { status: 201 }
        );
    } catch (err) {
        console.error("Failed to verify email:", err.message);
        return new Response(
            JSON.stringify({
                status: false,
                message: "Internal server error.",
                error: err.message,
            }),
            { status: 500 }
        );
    }
};