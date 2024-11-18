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
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import toast from "react-hot-toast";
import MoreBlogs from "@/components/blogsSection/MoreBlogs";
import Spinner from "@/components/common/Spinner";
import Modal from "@/components/common/Modal";

const Blog = ({ params }) => {
  const { isUserLoggedIn } = useAuth();
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // Alernate way to use the above logc using .some()
  const hasUserLiked = likedUsers.some((likedUser) => likedUser === userId);
  const canEditAndDelete = blogData?.userData?._id.toString() === userId;

  const deleteBlogHandler = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const confirmedDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blogs/${blogId}`,
        {
          method: "DELETE",
        },
      );
      const output = await response.json();
      if (response.ok) {
        toast.success("Blog Deleted");
        router.push("/blogs");
      } else if (!response.ok) {
        toast.error("Server Error, Please try again");
      }
      console.log(output);
    } catch (err) {}
  };

  return (
    <div
      className={`w-11/12 flex flex-col items-start gap-2 mx-auto h-full mb-10 md:mb-20 mt-5`}>
      {!blogData ? (
        <div className="flex w-full h-fit mx-auto items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row relative">
          {/* This section contains the image and the blog description */}
          {isDeleteModalOpen && (
            <div className="flex items-center fixed z-10 top-[5%] left-0 justify-center w-full h-screen">
              {/* This section will be blurred when the modal is open */}
              <Modal
                type="deleteBlog"
                setDeleteModalOpen={setIsDeleteModalOpen}
                isDeleteModalOpen={isDeleteModalOpen}
                confirmedDelete={confirmedDelete}
              />
            </div>
          )}

          {/* Wrapper that can be blurred when delete modal is open */}
          <div
            className={`flex flex-col md:flex-row relative w-full ${
              isDeleteModalOpen && "blur-md pointer-events-none"
            }`}
            onClick={() => {
              isDeleteModalOpen && setIsDeleteModalOpen(false);
            }}>
            <section className="md:flex flex-col items-start justify-start md:pr-10 w-full md:border-r-2 rounded-s-lg gap-4 md:gap-5">
              <section className="flex flex-col px-6 md:p-5 justify-center item w-full">
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
                  <h1 className="text-[18px] md:text-[45px] w-full font-bold mt-5">
                    {blogData?.title}
                  </h1>
                </div>
                <div className="flex gap-2 items-center mt-5 justify-between w-[95%] md:w-full">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2 xl:gap-5 text-slate-500">
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
                    <div className="flex flex-row justify-between gap-5">
                      <p className="text-[11px] xl:text-lg font-semibold">
                        {userData?.name}
                      </p>
                      <p className="text-slate-500 text-[11px] xl:text-lg">
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
                          <Spinner />
                        ) : (
                          <>
                            <FaHeart className="text-red-500 mr-1 text-[18px] md:text-[22px]" />
                            <p>
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
                          <Spinner />
                        ) : (
                          <>
                            <CiHeart className="mr-0 text-[22px] md:text-[22px]" />
                            <p>
                              {likedUsers?.length > 0 ? likedUsers?.length : 0}
                            </p>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </section>
              <div className="flex flex-col items-center justify-center mx-auto mt-3 md:mt-0 pr-4 md:pr-0 md:w-full">
                <div className="relative w-[90%] md:w-[800px] md:h-[500px]">
                  <Image
                    src={blogData?.blogImage}
                    alt="blogImage"
                    width={800}
                    height={500}
                    className="object-contain rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="pt-6 md:pt-10 bg-white bg-opacity-90 backdrop-blur-md w-[90%] md:w-[100%] flex text-justify">
                  <p className="text-[#3B3C4A] text-[12px] md:text-[18px] leading-relaxed">
                    {blogData?.description}
                  </p>
                </div>
                {canEditAndDelete && (
                  <div className="w-[90%] flex items-center gap-5 md:pt-10 h-full mt-5">
                    <button className="flex border-2 border-black items-center justify-center text-[12px] md:text-[14px] p-1 w-fit md:px-4 md:py-2 rounded-md outline-none gap-2">
                      <p>Edit</p>
                      <FaRegEdit className="text-[14px]" />
                    </button>
                    <button
                      onClick={deleteBlogHandler}
                      className="flex items-center justify-center text-[12px] md:text-[14px] p-1 w-fit md:px-4 md:py-2 rounded-md bg-red-500 text-white outline-none gap-2">
                      <p>Delete blog</p>
                      <MdDelete className="text-[16px]" />
                    </button>
                  </div>
                )}
              </div>
            </section>
            <aside className="flex flex-col mt-5">
              <MoreBlogs text="More Blogs" />
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
