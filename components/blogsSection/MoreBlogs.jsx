import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { GoPerson } from "react-icons/go";

const MoreBlogs = ({ text }) => {
  const [visible, setVisible] = useState(3);

  const pathName = usePathname();
  const blogId = pathName.split("/")[2];
  const { allBlogsData } = useAuth();
  const blogs = allBlogsData?.blogs;
  const filteredBlogs = blogs?.filter(
    (blog) => blog?._id.toString() !== blogId,
  );
  useEffect(() => {
    blogs?.sort(() => Math.random() - 0.5);
  }, [blogs]);

  const loadMoreHandler = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <>
      {/* Heading */}
      <div className="font-bold text-[24px] px-6 xl:block flex items-center w-full justify-center xl:text-[32px]">
        {text}
      </div>

      {/* All Blogs Cards */}
      {/* Blog 1 card */}
      <div
        className={`w-full h-fit xl:p-2 rounded-xl gap-5 items-center flex flex-col overflow-x-hidden ${
          blogs && "flex flex-col"
        }  ${!blogs && "flex items-center justify-center"}`}>
        {!blogs ? (
          <div className="flex w-full h-fit xl:translate-x-[100%]">
            <Loading />
          </div>
        ) : (
          filteredBlogs?.slice(0, visible).map((blog, index) => {
            const userData = blog?.userData;
            const date = new Date(blog?.date);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <Link
                key={index}
                href={`/blogs/${blog?._id}`}
                className="flex w-full h-full gap-2">
                <div className="flex w-full h-fit gap-5" key={blog._id}>
                  <div className="h-fit items-center border-b-2 border-b-slate-200 justify-between mx-auto w-full flex gap-6 cursor-pointer py-2 pb-6">
                    {/* Image */}
                    <div className="flex w-[200px] h-[120px] relative">
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
                    </div>

                    <div className="w-[50%] flex flex-col items-start justify-start mt-5 xl:mt-0">
                      {/* Tag and paragraph */}
                      <div className="flex flex-col w-full">
                        {/* Author image, title and date */}
                        <h3 className="font-semibold text-[12px] xl:text-[16px]">
                          {blog?.title}
                          {/* The Impact of Technology on the Workplace: How Technology is Changing */}
                        </h3>
                        <p className="text-blue-500 font-normal text-[11px] xl:text-[12px] mt-2">
                          {blog?.tag}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center justify-between mt-5">
                        <div className="flex items-center justify-center gap-2 xl:gap-4 text-slate-500">
                          {userData?.profileImage ? (
                            <img
                              src={`${userData?.profileImage}`}
                              alt=""
                              // width={20}
                              // height={20}
                              className="w-9 h-9 xl:w-10 xl:h-10 object-cover rounded-full"
                              loading="lazy"
                            />
                          ) : (
                            <div className="border-2 rounded-full p-2">
                              <GoPerson className="text-[20px]" />
                            </div>
                          )}
                          <div className="flex flex-col items-start justify-center gap-1">
                            {/* Author name */}
                            <p className="text-[11px] xl:text-[13px]">
                              {userData?.name || "BlogCanvas User"}
                            </p>
                            {/* Published date */}
                            <p className="text-slate-500 text-[9px] xl:text-[13px]">
                              {formattedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      {visible <= filteredBlogs?.length && (
        <button
          onClick={loadMoreHandler}
          className="text-[12px] xl:text-[14px] bg-white border-2 border-black border-opacity-50 px-4 py-2 w-fit flex text-center items-center justify-center mx-auto rounded-xl font-semibold mt-5 hover:text-black hover:border-2 hover:border-black duration-200 hover:scale-95 hover:shadow-xl">
          Load More....
        </button>
      )}
    </>
  );
};

export default MoreBlogs;
