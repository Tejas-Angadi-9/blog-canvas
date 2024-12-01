import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditBlogModal = ({ setIsEditModalOpen, blogId, blogContent }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [blogData, setBlogData] = useState({
    title: blogContent?.title,
    description: blogContent?.description,
    tag: blogContent?.tag,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("tag", blogData.tag);

    if (selectedImage) {
      formData.append("blogImage", selectedImage);
    }

    updateBlog(formData);
  };

  const updateBlog = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/blogs/${blogId}`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      if (response.ok) {
        toast.success("Blog updated successfully!");
        setBlogData({ title: "", description: "", tag: "" });
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditModalOpen(false);
        setTimeout(() => {
          location.reload();
        }, 2000);
        return;
      } else if (response?.status === 404) {
        // toast.error(`Error: ${output.message || "Unable to create blog"}`);
        localStorage.removeItem("UserData");
        toast.error("Session expired Please log in again");
        router.push("/auth");
        return;
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col items-center justify-center xl:absolute left-[50%] top-0 xl:-translate-x-[50%] bg-white z-10 p-2 xl:p-5 w-11/12 max-w-md xl:max-w-[60%] h-fit py-5 rounded-md shadow-2xl gap-5 overflow-y-auto -ml-2 xl:ml-0">
      <div className="px-4 w-full flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h2 class="text-[18px] xl:text-[24px] font-semibold text-gray-800">
            Edit Blog
          </h2>
          <p class="text-[14px] xl:text-[16px] text-gray-600">
            You can edit only the fields you want to change. Leave the others
            blank.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 w-full rounded-lg p-5 transition-shadow duration-300 text-[14px] lg:text-[16px]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-base xl:text-lg font-semibold">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter your blog title"
                value={blogData.title}
                onChange={handleInputChange}
                className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light xl:font-normal"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-base xl:text-lg font-semibold">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows={10}
                placeholder="Write your blog content here..."
                value={blogData.description}
                onChange={handleInputChange}
                className="border-2 border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light xl:font-normal"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="blogImage"
                className="text-base xl:text-lg font-semibold text-gray-700">
                Blog Image:
              </label>
              <input
                type="file"
                accept="image/*"
                name="blogImage"
                id="blogImage"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="blogImage"
                className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 transition duration-150">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected blog"
                    className="h-32 object-cover rounded-md mb-2"
                    loading="lazy"
                  />
                ) : (
                  <p>Choose an Image.</p>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="tag"
                className="text-base xl:text-lg font-semibold">
                Tag:
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                placeholder="Add relevant tags"
                value={blogData.tag}
                onChange={handleInputChange}
                className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light xl:font-normal"
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-5">
            <button
              className={`mt-5 w-fit bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 hover:scale-95 ${
                isLoading &&
                "pointer-events-none bg-blue-400 cursor-not-allowed disabled"
              }`}
              type="submit"
              disabled={isLoading}>
              {isLoading ? "Updating Blog..." : "Update Blog"}
            </button>
            <button
              className={`mt-5 w-fit text-black border-2 px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-95${
                isLoading && "pointer-events-none cursor-not-allowed disabled"
              }`}
              onClick={() => {
                if (!isLoading) {
                  setIsEditModalOpen((prev) => !prev);
                }
              }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
