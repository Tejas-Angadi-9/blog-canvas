import cloudinary from "@/config/cloudinary";

const cloudinaryUploader = async (buffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer); // Stream the buffer to Cloudinary
    });
}

export default cloudinaryUploader