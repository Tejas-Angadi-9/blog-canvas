import bcrypt from "bcrypt";

import connectToDB from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import Verification from "@/models/Verification";

const checkPasswordValidation = (password) => {
  const lowerCase = /[a-z]/.test(password);
  const upperCase = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const length = password.length >= 8;

  if (!lowerCase || !upperCase || !number || !specialChar || !length)
    return false;
  return true;
};

export const PATCH = async (req) => {
  // Take the input data
  const { token, password, confirmPassword } = await req.json();

  // Validate the input data
  if (!token || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Fill all the fields",
      }),
      { status: 400 }
    );
  }

  // Check if both the passwords matches
  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Passwords are not matching",
      }),
      { status: 400 }
    );
  }

  const isPasswordValid = checkPasswordValidation(password);
  if (isPasswordValid === false) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Check for password requirements",
      }),
      { status: 400 }
    );
  }


  try {
    await connectToDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const exisitingUser = await User.findOne({ email: email });
    if (!exisitingUser) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

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
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Failed to hash the password",
        }),
        { status: 403 }
      );
    }

    await User.updateOne({ password: hashedPassword });

    return new Response(
      JSON.stringify(
        {
          status: true,
          message: "Passwords updated successfully!",
        },
        { status: 201 }
      )
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: false,
        message: err.message,
        data: "Internal server error while updating the password",
      })
    );
  }
};
