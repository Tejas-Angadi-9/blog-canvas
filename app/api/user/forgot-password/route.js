import connectToDB from "@/config/database";
import User from "@/models/User";
import Verification from "@/models/Verification";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({
            status: false,
            message: "Email not found"
        }), { status: 400 })
    }
    try {
        await connectToDB();
        const exisitingUser = await User.findOne({ email: email });

        if (!exisitingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found!"
            }), { status: 404 })
        }

        const payload = {
            email: email
        }

        const forgotPasswordToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" })
        if (!forgotPasswordToken) {
            return new Response(JSON.stringify({
                status: false,
                message: "Failed to generate token"
            }), { status: 404 })
        }

        const tokenAlreadyGenerated = await Verification.findOne({ email: email });
        if (tokenAlreadyGenerated) {
            console.log("Token is regenerated")
            tokenAlreadyGenerated.token = forgotPasswordToken;
            tokenAlreadyGenerated.expiresAt = Date.now() + 10 * 60 * 1000
            await tokenAlreadyGenerated.save();
        }
        else {
            console.log("Token is generated for the first time")
            const tokenGenerated = await Verification.create(
                {
                    email: email,
                    token: forgotPasswordToken,
                    expiresAt: Date.now() + 10 * 60 * 1000
                }
            );

            if (!tokenGenerated) {
                return new Response(JSON.stringify({
                    status: false,
                    message: "Failed to generate forgot password link"
                }), { status: 404 })
            }
        }

        return new Response(JSON.stringify({
            status: true,
            message: "Reset link sent to your email. Please check",
            link: `http://localhost:3000/auth/forgot-password/${forgotPasswordToken}`
        }))
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            data: "Internal server issue while generating forgot password link",
            message: err.message
        }))
    }
}