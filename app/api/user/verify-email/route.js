import connectToDB from "@/config/database";
import Verification from "@/models/Verification";

export const POST = async (req) => {
    try {
        const { email } = await req.json();

        // Validate input
        if (!email || !token) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Email and token are required.",
                }),
                { status: 400 }
            );
        }

        await connectToDB();

        // Fetch the verification entry
        const existingToken = await Verification.findOne({ email });
        if (!existingToken) {
            return new Response(
                JSON.stringify({
                    status: false,
                    message: "Verification entry not found.",
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

        // Success: Token is valid
        await existingToken.deleteOne(); // Clean up the verification entry
        return new Response(
            JSON.stringify({
                status: true,
                message: "Email validated successfully.",
            }),
            { status: 200 }
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
