import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const POST = async (req) => {
    const { token, newPassword, confirmNewPassword } = await req.json();

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: "Token is missing"
        }), { status: 400 })
    }

    if (!newPassword || !confirmNewPassword) {
        return new Response(JSON.stringify({
            status: false,
            message: "Please provide both new password and confirm password fields."
        }), { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
        return new Response(JSON.stringify({
            status: false,
            message: "Passwords do not match."
        }), { status: 400 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid or expired token."
            }), { status: 400 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;

        // Remove the resetPasswordToken and resetPasswordExpires fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the user with the new password and removed fields
        await user.save();

        // Send a response that the password has been updated
        return new Response(JSON.stringify({
            status: true,
            message: "Password has been updated successfully."
        }));
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Error in resetting the password."
        }), { status: 500 });
    }
}