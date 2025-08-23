import connectToDB from "@/config/database";
import Blog from "@/models/Blog";


// Getting all the blogs
export const GET = async (req) => {
    try {
        await connectToDB();
        const blogs = await Blog.find({})
            .populate("userData", "-password").exec();

        return new Response(JSON.stringify({
            status: true,
            message: 'Blogs found',
            totalBlogs: blogs.length,
            blogs
        }), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while fetching all the blog posts"
        }))
    }
}

export const POST = async (req) => {
    try {
        await connectToDB();
        const blogs = await Blog.find({})
            .populate("userData", "-password").exec();

        return new Response(JSON.stringify({
            status: true,
            message: 'Blogs found',
            totalBlogs: blogs.length,
            blogs
        }), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    }
    catch (err) {
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while fetching all the blog posts"
        }))
    }
}
