import bcrypt from "bcrypt";

import connectToDB from "@/config/database";
import User from "@/models/User";

const checkPasswordValidation = (password) => {
  const lowerCase = /[]/.test(password);
  const upperCase = /[]/.test(password);
  const number = /[]/.test(password);
  const specialChar = /[]/.test(password);
  const length = password.length >= 8;

  if (!lowerCase || !upperCase || !number || !specialChar || !length) {
    return false;
  }
  return true;
};

export const POST = async (req) => {
  // Take the input data
  const { email, password, confirmPassword } = await req.json();

  // Validate the input data
  if (!email || !password || !confirmPassword) {
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
