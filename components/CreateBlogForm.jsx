"use client";
import React, { useState } from "react";

const CreateBlogForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File: ", file);
    if (file) {
      const reader = new FileReader();
      console.log("Reader: ", reader);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 md:px-10">
      <form action="">
        <div className="flex flex-col gap-5 w-full border-gray-300 rounded-lg shadow-lg p-10 transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-semibold">
              Title:
            </label>
            <input
              type="text"
              required
              placeholder="Enter your blog title"
              className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-lg font-semibold">
              Description:
            </label>
            <textarea
              required
              id="description"
              placeholder="Write your blog content here..."
              className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="blogImage"
              className="text-lg font-semibold text-gray-700">
              Blog Image:
            </label>
            <input
              type="file"
              accept="image/*"
              id="blogImage"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="blogImage"
              className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 transition duration-150">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="blogImage.png"
                  className="h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <p>Choose an Image.</p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-lg font-semibold">
              Tag:
            </label>
            <input
              type="text"
              required
              id="tag"
              placeholder="Add relevant tags"
              className="border-b-2 border-gray-400 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
        </div>

        <button className="mt-10 w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 hover:scale-95">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
