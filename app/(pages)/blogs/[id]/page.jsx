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

const Blog = ({ params }) => {
  const { isUserLoggedIn } = useAuth();
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);

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

  const blogId = params?.id;

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

  useEffect(() => {
    getEachBlogData();
  }, []);

  const date = new Date(blogData?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log("BLog Data: ", likedUsers.length);

  const likeHandler = () => {
    if (!isUserLoggedIn) {
      toast("Login to like!", {
        style: { marginTop: "10px" },
      });
      router.push("/auth");
      return;
    }
  };

  const localData = localStorage.getItem("UserData");
  const userInfo = JSON.parse(localData);
  const userId = userInfo?.user?._id;
  console.log("UserInfo: ", userInfo?.user?._id);
  console.log("blogData: ", likedUsers);

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

  return (
    <div className="w-11/12 flex flex-col items-start gap-2 mx-auto h-full mb-10 md:mb-20">
      {!blogData ? (
        <div className="flex w-full h-fit mx-auto items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <section className="flex flex-col p-2 md:p-5 justify-between w-full">
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
              <h1 className="text-[18px] md:text-[45px] md:w-11/12 font-bold mt-5">
                {/* The Impact of Technology on the Workplace: How Technology is
            Changing */}
                {blogData?.title}
              </h1>
            </div>
            <div className="flex gap-2 items-center mt-5 justify-between">
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
              <div className="flex items-center justify-center pr-10 pb-1">
                <button
                  className="flex md:flex-col gap-1 items-center justify-center text-[14px]  md:text-[22px]"
                  onClick={likeHandler}>
                  <>
                    {hasUserLiked ? (
                      <FaHeart className=" text-red-500" />
                    ) : (
                      <CiHeart className="" />
                    )}
                  </>
                  <p className="">
                    {likedUsers?.length > 0 ? likedUsers?.length : 0}
                  </p>
                </button>
              </div>
            </div>
          </section>

          {/* This section contains the image and the blog description */}
          <section className="flex  flex-col items-center justify-center md:block md:px-5 w-full h-full gap-4 md:gap-10">
            <div className="relative w-[80%] md:w-[65%] h-[300px] flex md:h-[500px]">
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
            <div className="pt-6 md:pt-10 bg-white bg-opacity-90 backdrop-blur-md w-[95%] md:w-[65%] flex text-justify">
              <p className="text-[#3B3C4A] text-[12px] md:text-[18px] leading-relaxed">
                {blogData?.description}
              </p>
            </div>
          </section>

          <Link
            className="bg-white border-2 border-black text-black px-2 py-2 text-[12px] md:text-[16px] ml-4 md:px-4 md:py-2 rounded-md  transition-all duration-200 hover:border-2 hover:border-black hover:scale-95 flex items-center justify-center gap-2 mt-10"
            href={"/blogs"}>
            <IoMdArrowRoundBack />
            Go Back to blogs
          </Link>
        </>
      )}
    </div>
  );
};

export default Blog;
