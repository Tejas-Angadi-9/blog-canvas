import connectToDB from "@/config/database";
import Blog from "@/models/Blog"

export const GET = async (req) => {
    try {
        const connectedToDb = await connectToDB();
        if (!connectToDB) {
            return new Response(JSON.stringify({
                status: false,
                message: "Failed to connect to DB"
            }), { status: 401 })
        }
        const allBlogs = await Blog.find({}).populate("userData").exec();

        // if(!allBlogs){
        //     return new Response(JSON.stringify({
        //         status: false,
        //         message: "Failed to find the blogs"
        //     }))
        // }

        return new Response(JSON.stringify({
            status: true,
            message: "Fetched all the blogs",
            allBlogs
        }), { status: 200 })
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while fetching all the blog posts"
        }))
    }
}