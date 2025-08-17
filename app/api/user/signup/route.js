import Verification from "@/models/Verification"
import connectToDB from "@/config/database"
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { createTransporter, getMailOptions } from "@/services/mailer";

const checkPasswordValidation = (password) => {
    const isLowerCase = /[a-z]/.test(password)
    const isUpperCase = /[A-Z]/.test(password)
    const isNumber = /[0-9]/.test(password)
    const isSpecialChar = /[a-z]/.test(password)
    const islength = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!isLowerCase || !isUpperCase || !isNumber || !isSpecialChar || !islength)
        return false;
    return true;
}


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

    const isPasswordValid = checkPasswordValidation(password);
    if (isPasswordValid === false) {
        return new Response(JSON.stringify({
            status: false,
            message: "Check for password requirements"
        }), { status: 403 })
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const payload = { name, email, hashedPassword };
        const tokenExpiresAt = Date.now() + 10 * 60 * 1000
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenExpiresAt });

        const transporter = createTransporter();
        const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email/${jwtToken}`;
        const mailOptions = getMailOptions(email, name, verificationLink, "signup");
        await transporter.sendMail(mailOptions)

        const tokenAlreadyGenerated = await Verification.findOne({ email });
        if (tokenAlreadyGenerated) {
            tokenAlreadyGenerated.token = jwtToken;
            tokenAlreadyGenerated.expiresAt = Date.now() + 10 * 60 * 1000
            await tokenAlreadyGenerated.save();

            return new Response(JSON.stringify({
                status: true,
                message: "User has generated the validation token again, Please check your email",
            }))
        }
        else {
            await Verification.create({ email, token: jwtToken, expiresAt: Date.now() + 10 * 60 * 1000 });

            return new Response(JSON.stringify({
                status: true,
                message: "Successfully generated the token for validation and sent the reset link via email",
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