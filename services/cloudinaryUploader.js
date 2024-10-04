import cloudinary from "@/config/cloudinary";

const cloudinaryUploader = async (imageFilePath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageFilePath, {
            folder: folderName
        });
        return uploadResult;
    }
    catch (err) {
        console.log("Failed to upload the imagefile to cloudinary: ", err.message)
    }
}

export default cloudinaryUploader