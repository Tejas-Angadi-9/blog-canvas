import Verification from "@/models/Verification"
import connectToDB from "@/config/database"
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { createTransporter, getMailOptions } from "@/services/mailer";

export const POST = async (req) => {
    const { name, email, password, confirmPassword } = await req.json();
    if (!name || !email || !password || !confirmPassword) {
        return new Response(JSON.stringify({
            status: false,
            message: "Fill all the fields",
        }), { status: 400 })
    }

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({
            status: false,
            message: "Passwords doesn't match",
        }), { status: 400 })
    }
    try {
        await connectToDB();

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: "User has already signed-up. Please login",
            }), { status: 401 })
        }

        // Generate JWT Token and store it in verification collection
        const payload = { name, email, password };
        const tokenExpiresAt = Date.now() + 10 * 60 * 1000
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenExpiresAt });

        const transporter = createTransporter();
        const verificationLink = `http://localhost:3000/verify-email/${jwtToken}`;
        const mailOptions = getMailOptions(email, name, verificationLink);
        await transporter.sendMail(mailOptions)

        const tokenAlreadyGenerated = await Verification.findOne({ email });
        console.log("Token Already generated: ", tokenAlreadyGenerated)
        if (tokenAlreadyGenerated) {
            tokenAlreadyGenerated.token = jwtToken;
            tokenAlreadyGenerated.expiresAt = Date.now() + 10 * 60 * 1000
            await tokenAlreadyGenerated.save();

            return new Response(JSON.stringify({
                status: true,
                message: "User has generated the validation token again, Please check your email",
                tokenAlreadyGenerated
            }))
        }
        else {
            const verificationEntry = await Verification.create({ email, token: jwtToken, expiresAt: Date.now() + 10 * 60 * 1000 });

            return new Response(JSON.stringify({
                status: true,
                message: "Successfully generated the token for validation and sent the reset link via email",
                verificationEntry
            }));
        }
    }
    catch (err) {
        return new Response(
            JSON.stringify({
                status: false,
                message: err.message,
                data: "Internal server issue while generating the validation token."
            }), { status: 500 }
        );
    }
}