import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <div className="relative flex flex-col h-[250px] w-full xl:h-[500px] cursor-pointer">
        {/* Image */}
        <Image
          src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="blogImage"
          fill
          className="object-cover rounded-[10px] opacity-95"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-b-[10px]"></div>
        {/* Blog title, tag and other stuff */}
        <div className="bg-[#E8E8EA] shadow-xl p-2 xl:p-5 border-2 absolute -bottom-10 left-5 xl:-bottom-20 w-[60%] h-[150px] xl:w-[500px] xl:h-[250px] xl:m-10 rounded-xl flex flex-col gap-3 xl:gap-5 z-0">
          <div className="flex flex-col items-start gap-2">
            {/* Tag */}
            <h4 className="text-[10px] xl:text-[16px] px-2 py-1 xl:px-4 xl:py-2 bg-[#4B6BFB] inline text-white rounded-xl">
              Technology
            </h4>
            {/* Blog Title in bold */}
            <h1 className="text-[14px] font-medium xl:text-[24px] xl:font-semibold">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h1>
          </div>
          {/* Author image, name and date of blog published */}
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center justify-center gap-2 xl:gap-4 text-slate-500">
              <Image
                src="https://images.pexels.com/photos/23522528/pexels-photo-23522528/free-photo-of-portrait-of-a-young-man-with-short-curly-hair-wearing-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="userImage.png"
                width={40}
                height={40}
                className="w-7 h-7 object-cover xl:w-11 xl:h-11 rounded-full"
              />
              {/* Author name */}
              <p className="text-[11px] xl:text-lg font-semibold">
                Jason Francisco
              </p>
            </div>
            {/* Published date */}
            <p className="text-slate-500 text-[11px] xl:text-lg">
              August 20, 2022
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[90px] flex gap-5 flex-col items-center justify-center">
        <h1 className="text-[26px] xl:text-[42px] font-semibold">
          Why BlogCanvas?
        </h1>
        <p className="text-[15px] xl:text-[22px] text-slate-600 xl:px-10 italic xl:w-[50%] text-center">
          "A sleek and modern platform for sharing insightful and engaging blog
          content."
        </p>
      </div>
    </>
  );
};

export default HeroSection;
