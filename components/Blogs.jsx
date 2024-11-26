import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import { useState } from "react";

const Blogs = ({ text = "", blogsProp }) => {
  const [visible, setVisible] = useState(6);

  const loadMoreHandler = () => {
    setVisible((prev) => prev + 6);
  };

  let blogs;
  const { allBlogsData } = useAuth();
  if (blogsProp?.length > 0) {
    blogs = blogsProp;
  } else if (!blogsProp) {
    blogs = allBlogsData?.blogs;
  } else if (blogsProp.length === 0) {
    blogs = [];
  }

  return (
    <>
      {/* Heading */}
      <div className="font-bold text-[28px] xl:block text-center flex items-center w-full justify-center xl:text-[32px]">
        {text && text} Blogs
      </div>

      {/* All Blogs Cards */}
      {/* Blog 1 card */}
      <div
        className={`w-full h-fit xl:p-6 rounded-xl gap-10 items-center flex flex-col overflow-x-hidden ${
          blogs && "xl:grid md:grid xl:grid-cols-3 md:grid-cols-2"
        }  ${!blogs && "flex items-center justify-center"}`}>
        {blogs === null ? (
          <div className="flex w-full h-fit xl:translate-x-[100%]">
            <Loading />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex w-full h-fit xl:translate-x-[120%] py-5 lg:py-10">
            <h1 className="text-[22px] xl:text font-semibold">
              No Blogs {text}
            </h1>
          </div>
        ) : (
          blogs?.slice(0, visible).map((blog, index) => {
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
                className="flex w-full h-full gap-5 rounded-xl">
                <div
                  className="flex w-full h-full gap-5 rounded-xl px-3"
                  key={blog._id}>
                  <div className="h-[430px] shadow-lg w-full rounded-xl flex flex-col gap-2 p-4 cursor-pointer justify-between">
                    {/* Image */}
                    <div className="flex w-full h-[250px] relative">
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
                    {/* Tag and paragraph */}
                    <div className="flex flex-col gap-2">
                      <p className="text-blue-500 font-normal text-[12px] xl:text-[15px] mt-2">
                        {blog?.tag}
                      </p>
                      {/* Author image, title and date */}
                      <h3 className="font-semibold">
                        {blog?.title}
                        {/* The Impact of Technology on the Workplace: How Technology is
                Changing */}
                      </h3>
                    </div>
                    <div className="flex gap-2 items-center justify-between">
                      <div className="flex items-center justify-center gap-4 text-slate-500">
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
                            alt={`${userData?.name}.svg`}
                            width={40}
                            height={40}
                            className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                            loading="lazy"
                          />
                        )}

                        {/* Author name */}
                        <p className="text-[12px] xl:text-[14px]">
                          {/* Jason Francisco */}
                          {userData?.name}
                        </p>
                      </div>
                      {/* Published date */}
                      <p className="text-slate-500 text-[12px] xl:text-[14px]">
                        {/* August 20, 2022 */}
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      {visible <= blogs?.length && (
        <button
          onClick={loadMoreHandler}
          className="text-[12px] xl:text-[16px] bg-white border-2 border-black border-opacity-50 px-4 py-2 w-fit xl:w-[20%] flex text-center items-center justify-center mx-auto rounded-xl font-semibold mt-5 hover:text-black hover:border-2 hover:border-black duration-200 hover:scale-95 hover:shadow-xl">
          Load More....
        </button>
      )}
    </>
  );
};

export default Blogs;
