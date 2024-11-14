import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";

const Blogs = ({ page }) => {
  const { allBlogsData } = useAuth();
  const blogs = allBlogsData?.blogs;

  // console.log("FETCHED BLOGS: ", blogs[0]?.blogImage);
  return (
    <>
      {/* Heading */}
      <div className="font-bold text-[28px] md:block flex items-center w-full justify-center xl:text-[32px]">
        {page === "homePage" ? "Latest Blogs" : "All Blogs"}
      </div>
      {/* All Blogs Cards */}
      {/* Blog 1 card */}

      <div className="w-full h-full p-3 xl:p-6 rounded-md gap-x-5 gap-16 overflow-x-hidden md:grid md:grid-cols-3">
        {!blogs ? (
          <div className="flex w-full h-fit mx-auto items-center justify-center">
            <Loading />
          </div>
        ) : (
          blogs?.map((blog, index) => {
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
                target="_blank"
                className="flex md:w-[350px] h-full gap-5 border-[0.2px] border-slate-100 rounded-md">
                <div
                  className="flex w-[350px] h-full gap-5 border-[0.2px] border-slate-100 rounded-md"
                  key={blog._id}>
                  <div className="h-[430px] shadow-lg w-full rounded-md flex flex-col gap-2 p-4 cursor-pointer">
                    {/* Image */}
                    <div className="flex w-full h-[250px] relative">
                      <Image
                        // src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        src={`${blog?.blogImage}`}
                        alt="blog1.png"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    {/* Tag and paragraph */}
                    <div className="flex flex-col gap-2">
                      <p className="text-blue-500 font-normal text-[12px] md:text-[15px] mt-2">
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
                          <Image
                            src={`${userData?.profileImage}`}
                            alt=""
                            width={40}
                            height={40}
                            className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                          />
                        ) : (
                          <img
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${userData?.name}`}
                            alt={`${userData?.name}.svg`}
                            width={40}
                            height={40}
                            className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
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
      <button className="text-[12px] md:text-[16px] bg-slate-200 px-4 py-2 w-[50%] xl:w-[20%] flex text-center items-center justify-center mx-auto rounded-md font-semibold mt-5 hover:bg-white hover:text-black hover:border-2 hover:border-black duration-200 hover:scale-95 hover:shadow-md">
        Load More....
      </button>
    </>
  );
};

export default Blogs;
