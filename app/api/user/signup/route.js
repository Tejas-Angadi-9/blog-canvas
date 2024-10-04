import User from "@/models/User";
import bcrypt from "bcrypt"
import connectToDB from "@/config/database";

export const POST = async (req) => {
  const { name, email, password, confirmPassword } = await req.json();
  await connectToDB();
  try {
    // Validate the input fields
    if (!name || !email || !password || !confirmPassword) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Fill all the fields",
        }),
        { status: 400 }
      );
    }

    // Check if both password and confirmPassword matches or not
    if (password != confirmPassword) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Passwords doesn't match",
        }),
        { status: 400 }
      );
    }

    // Check if the user already exists
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "User already exists",
        }),
        { status: 403 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // const hashedPassword = await crypto.
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    })

    return new Response(
      JSON.stringify({
        status: true,
        message: "New user is created",
        userDetails: newUser,
      })
    );
  } catch (err) {
    console.log("Internal server issue while signing up ", err.message);
    Response(
      JOSN.stringify({
        status: false,
        message: err.message,
        data: "Internal server issue while signing up",
      })
    );
  }
};
