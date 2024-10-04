import connectToDB from "@/config/database";
import User from "@/models/User";
import Blog from "@/models/Blog";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cloudinaryUploader from "@/services/cloudinaryUploader";
import path from "path";
import { promises as fs } from "fs";

export const DELETE = async (req, { params }) => {
    const blogId = params.blogId;
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");
    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: "Token not found. Please login again"
        }), { status: 404 })
    }

    try {
        const decodedData = jwt.verify(token.value, process.env.JWT_SECRET);
        const userId = decodedData.userId;


        // Check if the user exists or not
        const exisitingUser = await User.findById(userId);
        if (!exisitingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found!'
            }), { status: 404 })
        }

        // Check if the blog contains the userId or not
        const blogData = await Blog.findOne({ _id: blogId });
        if (!blogData) {
            return new Response(JSON.stringify({
                status: false,
                message: "Blog Doesn't exist"
            }), { status: 404 })
        }

        const blogUserData = blogData.userData.toString()

        if (blogUserData !== userId) {
            return new Response(JSON.stringify({
                status: false,
                message: 'This blog is not created by this user'
            }))
        }

        await blogData.deleteOne();

        await User.findByIdAndUpdate(userId,
            { $pull: { createdBlogs: blogData._id } },
            { new: true })

        return new Response(JSON.stringify({
            status: true,
            message: 'Deleted the blog successfully'
        }), { status: 200 })
    }
    catch (err) {
        console.log('Internal server error while deleting the blog')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while deleting the blog post"
        }))
    }
}

export const PATCH = async (req, { params }) => {
    const blogId = params.blogId;
    // Get the token from a cookie
    const cookieStore = cookies();
    const token = cookieStore.get("authToken");

    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Token not found. Please login'
        }), { status: 404 })
    }

    const inputData = await req.formData();
    const title = inputData.get("title");
    const description = inputData.get("description");
    const tag = inputData.get("tag");
    const blogImage = inputData.get("blogImage");
    try {
        await connectToDB();
        const decodedData = jwt.verify(token.value, process.env.JWT_SECRET);
        if (!decodedData) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Token has expired. Please login again'
            }), { status: 404 })
        }

        const userId = decodedData.userId;
        // Validating whether the user is signed up or not
        const existingUser = await User.findById(userId).populate("createdBlogs").exec();
        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 })
        }

        const existingBlog = await Blog.findById(blogId);
        if (!existingBlog) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Blog not found!'
            }))
        }
        if (existingBlog.userData != userId) {
            return new Response(JSON.stringify({
                status: false,
                message: 'This blog is not created by this user...'
            }))
        }
        if (title) {
            await existingBlog.updateOne({ title: title })
        }
        if (description) {
            await existingBlog.updateOne({ description: description })
        }
        if (tag) {
            await existingBlog.updateOne({ tag: tag })
        }
        if (blogImage) {
            const buffer = Buffer.from(await blogImage.arrayBuffer());
            const uploadPath = path.join(process.cwd(), 'image-uploads', blogImage.name);
            await fs.writeFile(uploadPath, buffer);

            const imageUploadResult = await cloudinaryUploader(uploadPath, "Blog-Canvas");
            await existingBlog.updateOne({ blogImage: imageUploadResult.secure_url });
            await fs.unlink(uploadPath, buffer);
        }

        const updatedBlogData = await Blog.findById(blogId);
        return new Response(JSON.stringify({
            status: true,
            message: "Successfully updated the blog",
            userData: updatedBlogData
        }), { status: 201 })
    }
    catch (err) {
        console.log('Internal server error while updating the blog')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while updating the blog"
        }))
    }
}

export const GET = async (req, { params }) => {
    const blogId = params.blogId;

    try {
        await connectToDB();
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return new Response(JSON.stringify({
                status: false,
                message: "Blog not found",
            }), { status: 404 })
        }

        return new Response(JSON.stringify({
            status: true,
            blog: blog,
            message: "Blog found",
        }), { status: 200 })
    }
    catch (err) {
        console.log('Internal server error while getting a blog')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server error while getting a blog"
        }), { status: 500 })
    }
}