"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import Blogs from "@/components/Blogs";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import { GoPerson } from "react-icons/go";

const BlogsPage = () => {
  const { allBlogsData } = useAuth();
  const blogs = allBlogsData?.blogs;
  const blogLength = allBlogsData?.blogs?.length;
  const getRandomIndex = (blogLength) => {
    if (allBlogsData) {
      if (blogLength === 0) return null;
      return Math.floor(Math.random() * blogLength);
    }
  };

  const index = getRandomIndex(blogLength);
  if (index === null) {
    return (
      <div className="flex w-full h-screen mx-auto items-center justify-center">
        <h1 className="xl:text-[40px] font-bold -mt-10">No Blogs Found</h1>
      </div>
    );
  }

  const blog = index >= 0 && blogs[index];
  const date = new Date(blog?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-12 p-5 xl:px-20 xl:py-10 items-center justify-center mx-auto">
      <div className="flex flex-col h-[250px] w-[90%] xl:h-[500px] relative cursor-pointer">
        {blogs ? (
          <Link href={`/blogs/${blog?._id}`}>
            {blog?.blogImage ? (
              <Image
                // src="https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                src={blog?.blogImage}
                alt="Blog Image"
                fill
                className="object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <Image
                src="/images/no_image_available.jpg"
                alt=""
                fill
                className="object-cover rounded-lg"
                loading="lazy"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
            <div className="absolute bottom-0 p-5 xl:p-10 left-0 text-white">
              <div className="flex flex-col items-start gap-2 xl:gap-5">
                {/* Tag */}
                <h4 className="text-[10px] xl:text-[16px] px-2 py-1 xl:px-4 xl:py-2 bg-[#4B6BFB] inline text-white rounded-xl">
                  {blog?.tag}
                </h4>
                {/* Blog Title in bold */}
                <h1 className="text-[14px] font-medium xl:text-[24px] xl:font-semibold text-white w-full">
                  {/* Serenity by the Snowy Peaks: Exploring the Beauty of a Mountain
              Lake */}
                  {blog?.title}
                </h1>
                <div className="flex items-center justify-center gap-2 xl:gap-4">
                  {blog?.userData?.profileImage ? (
                    <img
                      // src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      src={blog?.userData?.profileImage}
                      alt="userImage.png"
                      width={40}
                      height={40}
                      className="w-7 h-7 object-cover xl:w-11 xl:h-11 rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="border-2 rounded-full p-2">
                      <GoPerson className="text-[20px]" />
                    </div>
                  )}
                  {/* Author name */}
                  <p className="text-[11px] xl:text-lg font-semibold ">
                    {/* Sarah Thompson */}
                    {blog?.userData?.name || "BlogCanvas User"}
                  </p>
                  <p className=" text-[11px] xl:text-lg">{formattedDate}</p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <Loading />
        )}
      </div>
      <div className="w-[95%]">
        {blogs && <Blogs page="blogsPage" blogs={blogs} />}
      </div>
    </div>
  );
};

export default BlogsPage;
