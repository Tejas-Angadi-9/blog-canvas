import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Blog from "@/models/Blog";
import connectToDB from "@/config/database";
import User from "@/models/User";
import { promises as fs } from "fs";
import path from "path";
import cloudinaryUploader from "@/services/cloudinaryUploader";

export const POST = async (req) => {
    // Creating a cookie instance
    const cookieStore = cookies();
    // Fetching the token from the cookie
    const token = cookieStore.get("authToken");
    // Fetching the data from the formdata
    const inputData = await req.formData();
    const title = inputData.get("title");
    const description = inputData.get("description");
    const tag = inputData.get("tag");
    const blogImage = inputData.get("blogImage");

    // Validating the token
    if (!token) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Token not found. Please login'
        }), { status: 404 })
    }

    // Validating the input data from the formdata
    if (!title || !description || !tag) {
        return new Response(JSON.stringify({
            status: false,
            message: 'Fill all the required fields'
        }), { status: 400 })
    }
    try {
        // Connecting to the DB
        await connectToDB();
        // Getting the payload data from the token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        // Validating the decoded Payload data
        if (!decoded) {
            return new Response(JSON.stringify({
                status: false,
                message: 'Token has expired. Please login again'
            }), { status: 404 })
        }

        // Storing the userId from the payload data
        const userId = decoded.userId;
        // Validating whether the user is signed up or not
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return new Response(JSON.stringify({
                status: false,
                message: 'User not found'
            }), { status: 404 })
        }

        // Uploading the image file to the server then to the cloudinary to generate a secure url
        if (!blogImage) {
            // If blog image is not found then directly enter the data in to the blog DB
            const blogData = {
                title: title,
                description: description,
                tag: tag,
                userData: userId
            }

            const newBlog = await Blog.create(blogData);

            await User.findByIdAndUpdate(userId,
                { $push: { createdBlogs: newBlog._id } },
                { new: true }
            )

            return new Response(JSON.stringify({
                status: true,
                message: "Blog post created successfully!",
                blog: newBlog
            }), { status: 201 })
        }
        else {
            // If blog image is found then save the image to the local server with a path and then upload it to cloudinary
            if (!blogImage) {
                return new Response(JSON.stringify({
                    status: true,
                    message: "Image file not found. Please try again"
                }))
            }

            const buffer = Buffer.from(await blogImage.arrayBuffer());
            const uploadPath = path.join(process.cwd(), 'image-uploads', blogImage.name);
            await fs.writeFile(uploadPath, buffer);

            const imageUploadResult = await cloudinaryUploader(uploadPath, "Blog-Canvas");

            await fs.unlink(uploadPath, buffer);
            const blogData = {
                title: title,
                description: description,
                tag: tag,
                blogImage: imageUploadResult.secure_url,
                userData: userId
            }

            const newBlog = await Blog.create(blogData);

            await User.findByIdAndUpdate(userId,
                { $push: { createdBlogs: newBlog._id } },
                { new: true }
            )

            return new Response(JSON.stringify({
                status: true,
                message: "Blog post created successfully!",
                blog: newBlog
            }), { status: 201 })
        }
    }
    catch (err) {
        console.log('Internal server while creating a new blog post')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Internal server while creating a new blog post"
        }))
    }
}