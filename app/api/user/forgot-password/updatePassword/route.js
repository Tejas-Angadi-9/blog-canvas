import bcrypt from "bcrypt";

import connectToDB from "@/config/database";
import User from "@/models/User";

const checkPasswordValidation = (password) => {
  const isLowerCase = /[a-z]/.test(password);
  const isUpperCase = /[A-Z]/.test(password);
  const isNumber = /[0-9]/.test(password);
  const isSpecialChar = /[a-z]/.test(password);
  const islength = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!isLowerCase || !isUpperCase || !isNumber || !isSpecialChar || !islength)
    return false;
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
    await tokenAlreadyGenerated.deleteOne();
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
