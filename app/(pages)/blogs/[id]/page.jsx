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
import { GoPerson } from "react-icons/go";

import toast from "react-hot-toast";
import MoreBlogs from "@/components/blogsSection/MoreBlogs";
import Spinner from "@/components/common/Spinner";
import Modal from "@/components/common/Modal";
import EditBlogModal from "@/components/blogsSection/EditBlogModal";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/blogs/${blogId}`,
      );
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

  const blogArray = blogData?.description?.split("\n");

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
        `${process.env.NEXT_PUBLIC_URL}/blogs/${blogId}/likeBlog`,
        {
          method: "POST",
        },
      );
      const output = await response.json();
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
        `${process.env.NEXT_PUBLIC_URL}/blogs/${blogId}/unlikeBlog`,
        {
          method: "POST",
        },
      );
      const output = await response.json();
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
  const userId = userInfo?.user;

  // Alernate way to use the above logc using .some()
  const hasUserLiked = likedUsers.some((likedUser) => likedUser === userId);
  const canEditAndDelete = blogData?.userData?._id.toString() === userId;

  const confirmedDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/blogs/${blogId}`,
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
    } catch (err) {
      console.log("Error occured during deleting the blog: ", err.message);
    }
  };

  return (
    <div
      className={`w-11/12 flex flex-col items-start xl:items-center gap-2 mx-auto h-full mb-10 xl:mb-20 mt-5`}>
      {!blogData ? (
        <div className="flex w-full h-fit mx-auto items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full xl:flex-row relative items-center justify-center">
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
          {isEditModalOpen && (
            <div
              className="flex justify-center"
              // className="flex items-center absolute z-10 top-[5%] left-0 justify-center w-full h-screen"
            >
              {/* This section will be blurred when the modal is open */}
              <EditBlogModal
                setIsEditModalOpen={setIsEditModalOpen}
                blogId={blogId}
                blogContent={blogData}
              />
            </div>
          )}

          {/* Wrapper that can be blurred when delete modal is open */}
          <div
            className={`flex flex-col xl:flex-row relative w-full ${
              (isDeleteModalOpen && "blur-md pointer-events-none") ||
              (isEditModalOpen && "blur-md pointer-events-none")
            }`}
            onClick={() => {
              (isDeleteModalOpen && setIsDeleteModalOpen(false)) ||
                (isEditModalOpen && setIsEditModalOpen(false));
            }}>
            <section className="xl:flex flex-col items-start justify-start xl:pr-10 w-full xl:border-r-2 rounded-s-lg gap-4 xl:gap-5">
              <section className="flex flex-col xl:p-5 justify-center item w-full">
                <div className="flex w-full justify-between items-center">
                  <TagButton text={blogData?.tag} />
                  <button
                    className="flex items-center gap-2 border-2 border-black p-2 xl:px-4 xl:py-2 rounded-md bg-white text-black transition-all duration-200 hover:text-white hover:bg-black xl:text-[16px] text-[10px]"
                    onClick={handleCopy}>
                    {copiedLink && (
                      <>
                        <p>Link copied Successfully</p>
                        <div className=" rounded-full p-2font-bold">
                          <MdDone className="text-green-500 text-[16px] xl:text-[22px]" />
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
                  <h1 className="text-[20px] xl:text-[45px] w-full font-bold mt-5">
                    {blogData?.title}
                  </h1>
                </div>
                <div className="flex gap-2 items-center mt-5 justify-between w-full">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2 xl:gap-5 text-slate-500">
                      {userData?.profileImage ? (
                        <img
                          src={`${userData?.profileImage}`}
                          alt=""
                          width={40}
                          height={40}
                          className="w-8 h-8 xl:w-10 xl:h-10 rounded-full"
                          loading="lazy"
                        />
                      ) : (
                        <div className="border-2 rounded-full p-2">
                          <GoPerson className="text-[20px]" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row justify-between gap-5">
                      <p className="text-[12px] xl:text-lg font-semibold">
                        {userData?.name || "BlogCanvas User"}
                      </p>
                      <p className="text-slate-500 text-[12px] xl:text-lg">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-center pb-1 pt-2">
                    {hasUserLiked ? (
                      <button
                        className="flex xl:flex gap-1 items-center justify-center text-[14px]  xl:text-[22px]"
                        onClick={unlikeHandler}>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            <FaHeart className="text-red-500 mr-1 text-[18px] xl:text-[22px]" />
                            <p>
                              {likedUsers?.length > 0 ? likedUsers?.length : 0}
                            </p>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="flex xl:flex gap-1 items-center justify-center text-[14px]  xl:text-[22px]"
                        onClick={likeHandler}>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            <CiHeart className="mr-0 text-[22px] xl:text-[28px]" />
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
              <div className="flex flex-col w-full items-center justify-center mx-auto mt-5 xl:mt-0 xl:pr-0 xl:w-full">
                <div className="relative w-[95%] xl:w-[800px] xl:h-full">
                  {!blogData ? (
                    <Loading />
                  ) : (
                    blogData?.blogImage && (
                      <Image
                        src={blogData?.blogImage}
                        alt=""
                        width={800}
                        height={500}
                        className="object-contain rounded-md"
                        loading="lazy"
                      />
                    )
                  )}
                  {!blogData ? (
                    <Loading />
                  ) : (
                    blogData?.blogImage === undefined && (
                      <div className="flex w-full items-center justify-center">
                        <Image
                          src="/images/no_image_available.jpg"
                          alt="/images/no-image-available.jpg"
                          width={400}
                          height={300}
                          className="object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="pt-6 xl:pt-10 bg-white bg-opacity-90 backdrop-blur-md w-[90%] xl:w-[100%] text-left flex flex-col gap-4">
                  {blogArray?.map((eachLine, index) => (
                    <p
                      key={index}
                      className="text-[14px] font-light xl:text-[18px] leading-relaxed">
                      {eachLine}
                    </p>
                  ))}
                  <div className="w-full">
                    {isUserLoggedIn && canEditAndDelete && (
                      <div className="w-[90%] flex items-center justify-start gap-5 xl:pt-10 h-full mt-5">
                        <button
                          className="flex border-2 border-slate-500 items-center justify-center text-[12px] xl:text-[14px] w-fit px-4 py-2 rounded-md outline-none gap-2 text-slate-700 font-light"
                          onClick={() => {
                            setIsEditModalOpen((prev) => !prev);
                            window.scrollTo(0, 0);
                          }}>
                          <p>Edit Blog</p>
                          <FaRegEdit className="text-[14px]" />
                        </button>
                        <button
                          onClick={() => setIsDeleteModalOpen((prev) => !prev)}
                          className="flex items-center justify-center text-[12px] xl:text-[14px] p-1 w-fit px-4 py-2 rounded-md bg-red-500 text-white outline-none gap-2">
                          <p>Delete blog</p>
                          <MdDelete className="text-[16px]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <aside className="flex flex-col mt-5">
              <MoreBlogs text="Featured Blogs" />
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
