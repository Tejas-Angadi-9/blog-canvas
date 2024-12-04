import connectToDB from "@/config/database";
import Verification from "@/models/Verification";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    const { token } = await req.json();
    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: "Token not found"
        }), { status: 400 })
    }

    try {
        await connectToDB();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        if (!decoded) {
            return new Response(JSON.stringify({
                status: false,
                message: "Token has expired"
            }), { status: 404 })
        }
        const tokenAlreadyGenerated = await Verification.findOne({ email: email });

        if (!tokenAlreadyGenerated) {
            return new Response(JSON.stringify({
                status: false,
                message: "User hasn't generated forgot password request"
            }), { status: 404 })
        }

        const expiresAt = new Date(tokenAlreadyGenerated.expiresAt).getTime();
        if (Date.now() > expiresAt) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Token has expired.",
                }),
                { status: 401 } // Unauthorized
            );
        }

        if (tokenAlreadyGenerated.token !== token) {
            return new Response(JSON.stringify({
                status: false,
                message: "Mismatch is forgot password token"
            }), { status: 400 })
        }

        await tokenAlreadyGenerated.deleteOne();

        return new Response(JSON.stringify({
            status: true,
            message: "Forgot password is verified, Please enter the new password and confirm it"
        }), { status: 200 })
    }
    catch (err) {
        console.error("Failed to verify forgot-password link:", err.message);
        return new Response(
            JSON.stringify({
                status: false,
                message: "Internal server error. While verifing forgot-password link",
                error: err.message,
            }),
            { status: 500 }
        );
    }
}