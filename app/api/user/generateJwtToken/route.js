// We get the email as the request body. I need to first validate it and check if the user exists or not. After that I need to generate a JWT token, Store this JWT token in the Db and set expiration for 10 mins, Send the mail to the user with the UI link (http://localhost:3000/jwtToken). After opening pick the url and split it and verify the jwtToken from the url with the DB. If same, then allow the user to input the Password and confirmNewPassword. Do the validation, check if both passwords matches, then hash the password and update the DB for password and at the end send the mail to the user, about it.

import User from "@/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
}

export const POST = async (req) => {
    const { email } = await req.json();
    if (!email) {
        return new Response(JSON.stringify({
            status: false,
            message: "Email not found, Please fill it."
        }), { status: 400 })
    }
    try {
        const exisitingUser = await User.findOne({ email: email })
        if (!exisitingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found!"
            }), { status: 404 })
        }


        // Generate a JWT Token and store it in the DB
        const validationToken = jwt.sign({ userId: exisitingUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" })

        exisitingUser.resetPasswordToken = validationToken;
        localStorage.setItem("userToken", validationToken);
        exisitingUser.resetPasswordExpires = Date.now() + 3 * 24 * 60 * 60 * 1000;

        await exisitingUser.save();

        const resetLink = `http://localhost:3000/reset-password/${validationToken}`;

        // Send the mail to the user with a url along with this validation token at the end
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Request",
            text: "You requested a password reset. Please click the following link to reset your password: ${resetLink}",
            html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        }

        await transporter.sendMail(mailOptions)

        return new Response(JSON.stringify({
            status: true,
            message: "Successfully generated the token for validation and sent the reset link via email",
        }));
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