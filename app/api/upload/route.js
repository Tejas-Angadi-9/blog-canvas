import { promises as fs } from "fs";
import path from "path";
import cloudinary from "@/config/cloudinary";

export const POST = async (req) => {
    try {
        const data = await req.formData()
        const file = data.get('file')
        if (!file) {
            return new Response(JSON.stringify({
                status: false,
                message: "File not found. Please upload the file"
            }), { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadPath = path.join(process.cwd(), 'uploads', file.name);

        await fs.writeFile(uploadPath, buffer);

        const result = await cloudinary.uploader.upload(uploadPath, {
            folder: "Blog-Canvas"
        })

        await fs.unlink(uploadPath)
        return new Response(JSON.stringify({
            status: true,
            imageUrl: result.secure_url,
            message: "SUCCESS"
        }))
    }
    catch (err) {
        console.log('Not able to upload the file')
        return new Response(JSON.stringify({
            status: false,
            message: err.message,
            data: "Failed to upload the file locally"
        }))
    }
}