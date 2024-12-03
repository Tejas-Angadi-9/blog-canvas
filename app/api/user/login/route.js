import connectToDB from "@/config/database";
import User from "@/models/User";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { serialize } from "cookie";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    await connectToDB();
    //Validate the inputs
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Fill all the fields",
        }), { status: 400 }
      );
    }
    // Check if the user exists from the DB or not
    const exisitingUser = await User.findOne({ email }).populate("createdBlogs").exec();
    if (!exisitingUser) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "User doesn't exist",
        }), { status: 404 }
      );
    }

    // Check if the password matches the password in DB (USE JWT.sign)
    const passwordFromDB = exisitingUser.password;
    const fetchedPassword = await bcrypt.compare(password, passwordFromDB);

    if (!fetchedPassword) {
      return new Response(JSON.stringify({
        status: false,
        message: 'Bad credentials'
      }), { status: 403 })
    }

    const payload = {
      userId: exisitingUser._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' })

    const cookie = serialize('authToken', token, {
      // httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    const { password: _, ...userWithoutPassword } = exisitingUser.toObject();

    // Then login
    return new Response(
      JSON.stringify({
        status: true,
        message: "User logged in successfully!",
        user: exisitingUser._id,
      }), {
      status: 200,
      headers:
        { 'Set-Cookie': cookie }
    });
  } catch (err) {
    console.log("Internal server issue while logging up ", err.message);
    Response(
      JSON.stringify({
        status: false,
        message: err.message,
        data: "Internal server issue while logging up",
      }), { status: 500 }
    );
  }
};
