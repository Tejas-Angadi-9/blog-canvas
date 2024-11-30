import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

import Loading from "./common/Loading";

const HeroSection = () => {
  const { allBlogsData } = useAuth();
  const blogs = allBlogsData?.blogs;
  const blogLength = allBlogsData?.blogs.length;
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
    <>
      {!blog ? (
        <Loading />
      ) : (
        <>
          <Link href={`/blogs/${blog?._id}`}>
            <div className=" flex flex-col h-[250px] w-full xl:h-[500px] cursor-pointer">
              {/* Image */}
              <div className="w-[90%] h-full shadow-lg flex items-center justify-center mx-auto relative">
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

                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
                {/* Blog title, tag and other stuff */}
                <div className="bg-[#E8E8EA] shadow-xl p-2 xl:p-5 border-2 absolute -bottom-10 left-5 xl:-bottom-20  xl:w-[500px] xl:h-fit xl:m-10 rounded-xl flex flex-col gap-3 xl:gap-5 z-0">
                  <div className="flex flex-col items-start gap-2">
                    {/* Tag */}
                    <h4 className="text-[8px] xl:text-[16px] w-fit px-[5px] py-[2px] xl:px-4 xl:py-2 bg-[#4B6BFB] inline text-white rounded-xl">
                      {/* Technology */}
                      {blog?.tag}
                    </h4>
                    {/* Blog Title in bold */}
                    <h1 className="text-[11px] font-medium xl:text-[24px] xl:font-semibold">
                      {/* The Impact of Technology on the Workplace: How Technology is
              Changing */}
                      {blog?.title}
                    </h1>
                  </div>
                  {/* Author image, name and date of blog published */}
                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex items-center justify-center gap-2 xl:gap-4 text-slate-500">
                      {blog?.userData?.profileImage && (
                        <img
                          // src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          src={blog?.userData?.profileImage}
                          alt="userImage.png"
                          width={40}
                          height={40}
                          className="w-7 h-7 object-cover xl:w-11 xl:h-11 rounded-full"
                          loading="lazy"
                        />
                      )}
                      {/* Author name */}
                      <p className="text-[9px] xl:text-lg font-semibold">
                        {/* Jason Francisco */}
                        {blog?.userData?.name || "BlogCanvas User"}
                      </p>
                    </div>
                    {/* Published date */}
                    <p className="text-slate-500 text-[9px] xl:text-lg">
                      {/* August 20, 2022 */}
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-[90px] flex gap-5 flex-col items-center justify-center">
            <h1 className="text-[26px] xl:text-[42px] font-semibold">
              Why BlogCanvas?
            </h1>
            <p className="text-[15px] xl:text-[22px] text-slate-600 xl:px-10 italic xl:w-[50%] text-center">
              "A sleek and modern platform for sharing insightful and engaging
              blog content."
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default HeroSection;
