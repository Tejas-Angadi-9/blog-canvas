"use client";
import TagButton from "@/components/TagButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import Loading from "@/components/common/Loading";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Blogs from "@/components/Blogs";
import MoreBlogs from "@/components/blogsSection/MoreBlogs";
import Spinner from "@/components/common/Spinner";

const Blog = ({ params }) => {
  const { isUserLoggedIn } = useAuth();
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    const linkToCopy = window.location.href; // or any specific URL you want to copy

    navigator.clipboard.writeText(linkToCopy).then(
      () => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 5000); // Reset the copied state after 5 seconds
      },
      () => {
        console.error("Failed to copy the link");
      },
    );
  };

  // Getting Blog Id from the url parameters
  const blogId = params?.id;

  // Getting each blog data
  const getEachBlogData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
      const output = await response.json();

      setBlogData(output?.blog);
      setUserData(output?.blog.userData);
      setLikedUsers(output?.blog.likedUsers);
    } catch (err) {
      console.log("Failed to fetch each blog data");
    }
  };

  // Converting Date to readable format
  const date = new Date(blogData?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Like Handler
  const likeHandler = async () => {
    if (!isUserLoggedIn) {
      toast("Login to like!", {
        style: { marginTop: "10px" },
      });
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/blogs/${blogId}/likeBlog`,
        {
          method: "POST",
        },
      );
      const output = await response.json();
      console.log(output);
      setLoading(false);
      toast.success("Blog Liked!");
    } catch (err) {
      console.log("Failed to like the blog: ", err.message);
    }
  };

  // Unlike Handler
  const unlikeHandler = async () => {
    if (!isUserLoggedIn) {
      toast("Login to like!", {
        style: { marginTop: "10px" },
      });
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/blogs/${blogId}/unlikeBlog`,
        {
          method: "POST",
        },
      );
      const output = await response.json();
      console.log(output);
      setLoading(false);
      toast.success("Blog Unliked!");
    } catch (err) {
      console.log("Failed to like the blog: ", err.message);
    }
  };

  useEffect(() => {
    getEachBlogData();
  }, [loading, 1000]);

  const localData = localStorage.getItem("UserData");
  const userInfo = JSON.parse(localData);
  const userId = userInfo?.user?._id;

  // const hasUserLiked = () => {
  //   for (let i = 0; i < likedUsers.length; i++) {
  //     if (userId === likedUsers[i]) {
  //       console.log("Got it");
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  // Alernate way to use the above logc using .some()
  const hasUserLiked = likedUsers.some((likedUser) => likedUser === userId);
  const canEditAndDelete = blogData?.userData?._id.toString() === userId;

  return (
    <div className="w-11/12 flex flex-col items-start gap-2 mx-auto h-full mb-10 md:mb-20">
      {!blogData ? (
        <div className="flex w-full h-fit mx-auto items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <section className="flex flex-col p-2 md:p-5 justify-around item w-full">
            <div className="flex w-full justify-between items-center">
              <TagButton text={blogData?.tag} />
              <button
                className="flex items-center gap-2 border-2 border-black p-2 md:px-4 md:py-2 rounded-md bg-white text-black transition-all duration-200 hover:text-white hover:bg-black md:text-[16px] text-[10px]"
                onClick={handleCopy}>
                {copiedLink && (
                  <>
                    <p>Link copied Successfully</p>
                    <div className=" rounded-full p-2font-bold">
                      <MdDone className="text-green-500 text-[16px] md:text-[22px]" />
                    </div>
                  </>
                )}
                {!copiedLink && (
                  <>
                    <p>Copy link</p>
                    <FaRegCopy className="" />
                  </>
                )}
              </button>
            </div>
            <div>
              <h1 className="text-[18px] md:text-[45px] md:w-[65%] font-bold mt-5">
                {/* The Impact of Technology on the Workplace: How Technology is
            Changing */}
                {blogData?.title}
              </h1>
            </div>
            <div className="flex gap-2 items-center mt-5 justify-between w-[62%]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2 xl:gap-5 text-slate-500">
                  {/* This contains the image of the user */}
                  {userData?.profileImage ? (
                    <img
                      src={`${userData?.profileImage}`}
                      alt=""
                      width={40}
                      height={40}
                      className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${userData?.name}`}
                      alt=""
                      width={40}
                      height={40}
                      className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                      loading="lazy"
                    />
                  )}
                </div>
                {/* Author name */}
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-[11px] xl:text-lg font-semibold">
                    {/* Jason Francisco */}
                    {userData?.name}
                  </p>
                  {/* Published date */}
                  <p className="text-slate-500 text-[11px] xl:text-lg">
                    {/* August 20, 2022 */}
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center justify-center pb-1 pt-2">
                {hasUserLiked ? (
                  <button
                    className="flex md:flex gap-1 items-center justify-center text-[14px]  md:text-[22px]"
                    onClick={unlikeHandler}>
                    {loading ? (
                      // <Loading />
                      <Spinner />
                    ) : (
                      <>
                        <FaHeart className="text-red-500 mr-1" />
                        <p className="">
                          {likedUsers?.length > 0 ? likedUsers?.length : 0}
                        </p>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    className="flex md:flex gap-1 items-center justify-center text-[14px]  md:text-[22px]"
                    onClick={likeHandler}>
                    {loading ? (
                      // <Loading />
                      <Spinner />
                    ) : (
                      <>
                        <CiHeart className="text-[28px]" />
                        <p className="">
                          {likedUsers?.length > 0 ? likedUsers?.length : 0}
                        </p>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* This section contains the image and the blog description */}
          <section className="md:flex md:flex-row flex-col items-start justify-center md:px-5 w-full h-full gap-4 md:gap-10">
            <div className="flex flex-col flex-1 items-center justify-center md:items-start md:justify-start">
              <div className="relative w-[80%] md:w-[90%] h-[300px] flex md:h-[500px]">
                {/* This contains the blog image */}
                <Image
                  // src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  src={blogData?.blogImage}
                  alt="blogImage"
                  layout="fill"
                  className="object-cover rounded-md opacity-95"
                  loading="lazy"
                />
              </div>
              <div className="pt-6 md:pt-10 bg-white bg-opacity-90 backdrop-blur-md w-[95%] md:w-[90%] flex text-justify">
                <p className="text-[#3B3C4A] text-[12px] md:text-[18px] leading-relaxed">
                  {blogData?.description}
                </p>
              </div>
              {canEditAndDelete == true && (
                <div className="w-[90%] flex items-center gap-5 md:pt-10 h-full mt-5">
                  <button className="flex border-2 border-black items-center justify-center text-[12px] md:text-[14px] p-1 w-fit md:px-4 md:py-2 rounded-md outline-none">
                    Edit
                  </button>
                  <button className="flex items-center justify-center text-[12px] md:text-[14px] p-1 w-fit md:px-4 md:py-2 rounded-md bg-red-500 text-white outline-none">
                    Delete
                  </button>
                </div>
              )}
            </div>
            <aside className="flex flex-col mt-5 md:-mt-20">
              <MoreBlogs text="More Blogs" />
            </aside>
          </section>
        </>
      )}
    </div>
  );
};

export default Blog;
