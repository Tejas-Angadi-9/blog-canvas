"use client";
import TagButton from "@/components/TagButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import Loading from "@/components/common/Loading";

const Blog = ({ params }) => {
  const [copiedLink, setCopiedLink] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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
      setUserInfo(output?.blog.userData);
    } catch (err) {
      console.log("Failed to fetch each blog data");
    }
  };

  useEffect(() => {
    getEachBlogData();
  }, []);

  console.log("Userdata: ", userInfo);
  console.log("blogData: ", blogData);

  return (
    <div className="w-11/12 flex flex-col items-start gap-2 mx-auto h-full mb-10 md:mb-20">
      {!blogData ? (
        <div className="flex w-full h-fit mx-auto items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <section className="flex flex-col p-2 md:p-10 justify-between w-full">
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
            <div className="flex gap-2 items-center mt-5">
              <div className="flex items-center justify-center gap-2 xl:gap-4 text-slate-500">
                {/* This contains the image of the user */}
                <Image
                  // src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  src={userInfo?.profileImage}
                  alt="userImage.png"
                  width={40}
                  height={40}
                  className="w-7 h-7 object-cover xl:w-11 xl:h-11 rounded-full"
                />
              </div>
              {/* Author name */}
              <div className="flex flex-row justify-between gap-5">
                <p className="text-[11px] xl:text-lg font-semibold">
                  {/* Jason Francisco */}
                  {userInfo?.name}
                </p>
                {/* Published date */}
                <p className="text-slate-500 text-[11px] xl:text-lg">
                  August 20, 2022
                </p>
              </div>
            </div>
          </section>

          {/* This section contains the image and the blog description */}
          <section className="flex flex-col relative md:px-20 w-full h-full gap-4 md:gap-10">
            <div className="relative w-full h-[300px] md:h-[500px]">
              {/* This contains the blog image */}
              <Image
                // src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                src={blogData?.blogImage}
                alt="blogImage"
                layout="fill"
                className="object-cover rounded-md opacity-95"
              />
            </div>
            <div className="p-4 bg-white bg-opacity-90 backdrop-blur-md md:w-11/12 mx-auto">
              <p className="text-[#3B3C4A] md:text-[20px] leading-relaxed">
                {/* Traveling is an enriching experience that opens up new horizons,
            exposes us to different cultures, and creates memories that last a
            lifetime. However, traveling can also be stressful and overwhelming,
            especially if you don't plan and prepare adequately. In this blog
            article, we'll explore tips and tricks for a memorable journey and
            how to make the most of your travels. One of the most rewarding
            aspects of traveling is immersing yourself in the local culture and
            customs. This includes trying local cuisine, attending cultural
            events and festivals, and interacting with locals. Learning a few
            phrases in the local language can also go a long way in making
            connections and showing respect. */}
                {blogData?.description}
              </p>
            </div>
          </section>

          <Link
            className="bg-white border-2 border-black text-black px-2 py-2 text-[15px] ml-4 md:px-4 md:py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 hover:border-2 hover:border-black hover:shadow-lg flex items-center justify-center gap-2 mt-10"
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
