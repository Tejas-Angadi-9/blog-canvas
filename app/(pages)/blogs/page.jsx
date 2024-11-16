"use client";
import Blogs from "@/components/Blogs";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchAllBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs");
      const output = await response.json();
      setBlogs(output?.blogs);
    } catch (err) {
      console.log("Failed to fetch all the blogs", err.message);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5 xl:px-20 xl:py-10 items-center justify-center mx-auto">
      <div className="flex flex-col h-[250px] w-full xl:h-[500px] relative cursor-pointer">
        <Image
          src="https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
        <div className="absolute bottom-0 p-5 xl:p-10 left-0 text-white">
          <div className="flex flex-col items-start gap-2 xl:gap-5">
            {/* Tag */}
            <h4 className="text-[10px] xl:text-[16px] px-2 py-1 xl:px-4 xl:py-2 bg-[#4B6BFB] inline text-white rounded-xl">
              {blogs[0]?.tag}
            </h4>
            {/* Blog Title in bold */}
            <h1 className="text-[14px] font-medium xl:text-[24px] xl:font-semibold text-white w-[70%] xl:w-[60%]">
              Serenity by the Snowy Peaks: Exploring the Beauty of a Mountain
              Lake
            </h1>
            <div className="flex items-center justify-center gap-2 xl:gap-4">
              <Image
                src="https://images.pexels.com/photos/23985701/pexels-photo-23985701/free-photo-of-silhouette-of-person-during-green-aurora.jpeg"
                alt="userImage.png"
                width={40}
                height={40}
                className="w-7 h-7 object-cover xl:w-11 xl:h-11 rounded-full"
              />
              {/* Author name */}
              <p className="text-[11px] xl:text-lg font-semibold ">
                Sarah Thompson
              </p>
              <p className=" text-[11px] xl:text-lg">June 12, 2023</p>
            </div>
          </div>
        </div>
      </div>
      {blogs && <Blogs page="blogsPage" blogs={blogs} />}
    </div>
  );
};

export default BlogsPage;