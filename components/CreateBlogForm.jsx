"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateBlogForm = () => {
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

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("tag", blogData.tag);

    if (selectedImage) {
      formData.append("blogImage", selectedImage);
    }

    postBlog(formData);
  };

  const postBlog = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/blogs/createBlog`,
        {
          method: "POST",
          body: formData,
        },
      );
      const output = await response.json();

      if (response.ok) {
        toast.success("Blog created successfully!");
        setBlogData({ title: "", description: "", tag: "" });
        setSelectedImage(null);
        setImagePreview(null);
        window.location.href = "/";
        return;
      } else if (response?.status === 404) {
        localStorage.removeItem("UserData");
        toast.error("Session Expired, Please login again");
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
    <div className="px-4 xl:w-[60%] xl:px-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full border-gray-300 rounded-lg shadow-lg p-10 transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-base lg:text-lg font-semibold">
              Title:
            </label>
            <input
              type="text"
              required
              name="title"
              id="title"
              placeholder="Enter your blog title"
              value={blogData.title}
              onChange={handleInputChange}
              className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light text-base lg:text-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-base lg:text-lg font-semibold">
              Description:
            </label>
            <textarea
              required
              id="description"
              name="description"
              rows={10}
              placeholder="Write your blog content here. You can add line breaks or extra spaces between paragraphs, and they will be displayed exactly as you write...."
              value={blogData.description}
              onChange={handleInputChange}
              className="border-2 border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light lg:font-light text-base lg:text-lg"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="blogImage"
              className="text-base lg:text-lg font-semibold text-gray-700 flex items-center w-full justify-start gap-2">
              Blog Image
              {<span className="text-[12px] text-red-500">(Optional)</span>}
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
                <p className="text-base lg:text-lg">Choose an Image.</p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-base lg:text-lg font-semibold">
              Tag:
            </label>
            <input
              type="text"
              required
              id="tag"
              name="tag"
              placeholder="Add relevant tags"
              value={blogData.tag}
              onChange={handleInputChange}
              className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200 font-light text-base lg:text-lg"
            />
          </div>
        </div>

        <button
          className={`mt-10 w-fit bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 hover:scale-95"
          type="submit ${
            isLoading && "pointer-events-none cursor-not-allowed"
          }`}
          disabled={isLoading}>
          {isLoading ? "Creating Blog..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
