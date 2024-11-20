import Image from "next/image";
import { Cedarville_Cursive } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"], // Specify the weight if needed
});

const AboutPage = () => {
  return (
    <div className="w-11/12 h-full mx-auto flex flex-col p-3 xl:px-10 mb-[5%] gap-10">
      <h1 className="text-[24px] xl:text-[36px] font-bold">About</h1>
      {/* This div will contain big text with my name at left side and image at the right side */}
      <div className="flex relative mt-5 mb-5 xl:-mb-12">
        {/* Big text with name */}
        <div className="h-[250px] xl:w-[50%] xl:left-[20%] xl:w-[48%] xl:h-[400px] bg-slate-200 p-5 absolute top-[45%] left-[24%] xl:left-[18%] z-1 opacity-80 rounded-md shadow-2xl flex flex-col justify-around">
          <h1 className="uppercase font-extrabold text-[22px] xl:text-[50px] flex flex-col items-center justify-center">
            Crafting BlogCanvas with creativity and connection.
          </h1>
          <h3
            className={`${cedarvilleCursive.className} text-[15px] xl:text-[44px] font-semibold ml-2 xl:ml-7`}>
            - Tejas Angadi
          </h3>
        </div>
        {/* Image */}
        <div className="">
          <Image
            src="/images/my_photo.jpg"
            alt="my_photo.jpg"
            width={400}
            height={600}
            className="w-[200px] h-[300px] xl:w-[400px] xl:h-[600px] object-cover  rounded-2xl shadow-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse xl:flex-row items-center justify-between mt-[15%] h-full w-full gap-10 xl:gap-24">
        {/* Social media links */}
        <div className="flex flex-col p-5 xl:w-[50%] shadow-xl rounded-md">
          <h2 className="text-[21px] text-center xl:text-start xl:text-2xl font-semibold mb-4">
            Social Media Links
          </h2>
          <div className="flex xl:flex-col xl:-gap-2 justify-evenly">
            <Link
              href="https://github.com/Tejas-Angadi-9"
              target="_blank"
              className="flex items-center p-2 hover:scale-95 gap-2 duration-300 border-r-[1px] border-slate-400 xl:border-none">
              <p className="flex items-center text-[15px] xl:text-xl font-medium p-1">
                <FaGithub className="text-[15px] xl:text-xl text-black mr-2" />{" "}
                GitHub
              </p>
              <FiExternalLink className="text-[15px] xl:text-xl mr-2 xl:mr-0" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tejasangadi9/"
              target="_blank"
              className="flex items-center p-2 hover:scale-95 gap-2 transition duration-300 ml-1 xl:ml-0 border-r-[1px] border-slate-400 xl:border-none">
              <p className="flex items-center text-[15px] xl:text-xl font-medium p-1">
                <FaLinkedin className="text-[15px] xl:text-xl text-blue-600 mr-2" />{" "}
                LinkedIn
              </p>
              <FiExternalLink className="text-[15px] xl:text-xl mr-2 xl:mr-0" />
            </Link>
            <Link
              href="https://tejasangadi-portfolio.netlify.app/"
              target="_blank"
              className="flex items-center p-2 hover:scale-95 gap-2 transition duration-300 ml-1 xl:ml-0">
              <p className="flex items-center text-[15px] xl:text-xl font-medium p-1">
                <CgWebsite className="text-[15px] text-slate-800 xl:text-xl mr-2" />
                Portfolio
              </p>
              <FiExternalLink className="text-[15px] xl:text-xl" />
            </Link>
          </div>
        </div>
        {/* Description */}
        <div className="text-center p-5 xl:p-10 bg-gray-100 text-gray-800 rounded-md shadow-xl flex flex-col gap-2">
          <h1 className="text-[21px] xl:text-3xl font-bold mb-4">
            Welcome to BlogCanvas! 🌟
          </h1>
          <p className="text-[15px] w-full xl:text-lg mb-4">
            Created by <span className="font-semibold">Tejas Angadi</span>, a
            23-year-old Automation Test Engineer at Cognizant with a passion for
            Web-Dev. This project is a personal endeavor to explore and showcase
            my skills in building applications. At <b>BlogCanvas</b> , you'll
            find a collection of insightful content crafted with dedication.
          </p>
          <div>
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-[15px] xl:text-lg">
                For inquiries or feedback, feel free to reach out:
              </p>
              <p className="text-blue-500 font-medium text-[15px] xl:text-lg">
                <Link
                  href="mailto:tejasangadi456@gmail.com"
                  className="hover:underline">
                  Email: tejasangadi456@gmail.com
                </Link>
              </p>
              <p className="text-blue-500 font-medium text-[15px] xl:text-lg">
                <Link href="tel:+919353423811" className="hover:underline">
                  Phone: +91 - 9353423811
                </Link>
              </p>
            </div>
            <p className="font-semibold text-[16px] xl:text-2xl mt-5">
              Dive in and enjoy the journey! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
