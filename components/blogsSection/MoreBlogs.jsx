import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";

const MoreBlogs = ({ text }) => {
  const [visible, setVisible] = useState(3);

  const { allBlogsData } = useAuth();
  const blogs = allBlogsData?.blogs;
  useEffect(() => {
    blogs?.sort(() => Math.random() - 0.5);
  }, [blogs]);

  const loadMoreHandler = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <>
      {/* Heading */}
      <div className="font-bold text-[28px] xl:block flex items-center w-full justify-center xl:text-[32px]">
        {text}
      </div>

      {/* All Blogs Cards */}
      {/* Blog 1 card */}
      <div
        className={`w-full h-fit xl:p-6 rounded-xl gap-10 items-center flex flex-col overflow-x-hidden ${
          blogs && "flex flex-col"
        }  ${!blogs && "flex items-center justify-center"}`}>
        {!blogs ? (
          <div className="flex w-full h-fit xl:translate-x-[100%]">
            <Loading />
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
                className="flex md:w-[350px] w-[300px] h-full gap-5 border-[0.2px] border-slate-100 rounded-xl">
                <div
                  className="flex w-[350px] h-full gap-5 border-[0.2px] border-slate-100 rounded-xl"
                  key={blog._id}>
                  <div className="h-[430px] shadow-lg w-full rounded-xl flex flex-col gap-2 p-4 cursor-pointer">
                    {/* Image */}
                    <div className="flex w-full h-[250px] relative">
                      <Image
                        // src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        src={`${blog?.blogImage}`}
                        alt="blog1.png"
                        fill
                        className="object-cover rounded-xl"
                        loading="lazy"
                      />
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
          className="text-[12px] xl:text-[14px] bg-white border-2 border-black border-opacity-50 px-4 py-2 w-fit flex text-center items-center justify-center mx-auto rounded-xl font-semibold mt-5 hover:text-black hover:border-2 hover:border-black duration-200 hover:scale-95 hover:shadow-xl">
          Load More....
        </button>
      )}
    </>
  );
};

export default MoreBlogs;
