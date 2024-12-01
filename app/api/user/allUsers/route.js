import connectToDB from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Getting all the blogs
export const GET = async (req) => {
    try {
        await connectToDB();
        console.log("Connected to database:", process.env.MONGODB_URI);
        const users = await User.find({});

        return new Response(JSON.stringify({
            status: true,
            message: 'Blogs found',
            totalUsers: users.length,
            users
        }), { status: 200 });
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while fetching all the users"
        }))
    }
}


