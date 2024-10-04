import Image from "next/image";

const Blogs = ({ page, blogs }) => {
  // console.log("FETCHED BLOGS: ", blogs[0]?.blogImage);
  return (
    <>
      {/* Heading */}
      <div className="font-bold text-[28px] xl:text-[32px]">
        {page === "homePage" ? "Latest Blogs" : "All Blogs"}
      </div>
      {/* All Blogs Cards */}
      <div className="w-full h-full p-3 xl:p-6 bg-slate-100 rounded-md flex flex-col gap-10">
        {/* Blog 1 card */}
        <div className="flex w-full h-full gap-5">
          <div className="h-[450px] border-2 w-full rounded-md flex flex-col gap-4 p-4 cursor-pointer">
            {/* Image */}
            <div className="flex w-full h-[250px] relative">
              <Image
                src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="blog1.png"
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
            </div>
            {/* Tag and paragraph */}
            <div className="flex flex-col gap-2">
              <p className="text-blue-500 font-medium">Technology</p>
              {/* Author image, title and date */}
              <h3 className="font-semibold">
                The Impact of Technology on the Workplace: How Technology is
                Changing
              </h3>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center justify-center gap-4 text-slate-500">
                <Image
                  src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                />
                {/* Author name */}
                <p className="text-[10px] xl:text-[14px]">Jason Francisco</p>
              </div>
              {/* Published date */}
              <p className="text-slate-500 text-[9px] xl:text-[14px]">
                August 20, 2022
              </p>
            </div>
          </div>
          <div className="h-[450px] border-2 w-full rounded-md flex flex-col gap-4 p-4 cursor-pointer">
            {/* Image */}
            <div className="flex w-full h-[250px] relative">
              <Image
                src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="blog1.png"
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
            </div>
            {/* Tag and paragraph */}
            <div className="flex flex-col gap-2">
              <p className="text-blue-500 font-medium">Technology</p>
              {/* Author image, title and date */}
              <h3 className="font-semibold">
                The Impact of Technology on the Workplace: How Technology is
                Changing
              </h3>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center justify-center gap-4 text-slate-500">
                <Image
                  src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                />
                {/* Author name */}
                <p className="text-[10px] xl:text-[14px]">Jason Francisco</p>
              </div>
              {/* Published date */}
              <p className="text-slate-500 text-[9px] xl:text-[14px]">
                August 20, 2022
              </p>
            </div>
          </div>
          <div className="h-[450px] border-2 w-full rounded-md flex flex-col gap-4 p-4 cursor-pointer">
            {/* Image */}
            <div className="flex w-full h-[250px] relative">
              <Image
                src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="blog1.png"
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
            </div>
            {/* Tag and paragraph */}
            <div className="flex flex-col gap-2">
              <p className="text-blue-500 font-medium">Technology</p>
              {/* Author image, title and date */}
              <h3 className="font-semibold">
                The Impact of Technology on the Workplace: How Technology is
                Changing
              </h3>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center justify-center gap-4 text-slate-500">
                <Image
                  src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className="w-6 h-6 xl:w-10 xl:h-10 rounded-full"
                />
                {/* Author name */}
                <p className="text-[10px] xl:text-[14px]">Jason Francisco</p>
              </div>
              {/* Published date */}
              <p className="text-slate-500 text-[9px] xl:text-[14px]">
                August 20, 2022
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-slate-200 px-4 py-2 w-[50%] xl:w-[20%] flex text-center items-center justify-center mx-auto rounded-md font-semibold mt-5 hover:bg-white hover:text-black hover:border-2 hover:border-black duration-200 hover:scale-95 hover:shadow-md">
        Load More....
      </button>
    </>
  );
};

export default Blogs;
