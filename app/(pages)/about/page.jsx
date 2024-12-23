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
      <div className="flex mt-5 mb-5 xl:-mb-12">
        {/* Image */}
        <div className="relative">
          <Image
            src="/images/my_photo.jpg"
            alt="my_photo.jpg"
            width={400}
            height={600}
            className="w-[200px] h-[300px] xl:w-[350px] xl:h-[500px] object-cover  rounded-2xl shadow-2xl"
          />
          {/* Big text with name */}
          <div className="h-fit w-[110%] lg:w-[170%] xl:h-fit bg-slate-200 p-5 absolute top-[55%] left-[50%] lg:left-[60%] z-1 opacity-90 rounded-md shadow-2xl flex flex-col justify-around">
            <h1 className="font-normal text-[22px] xl:text-[50px] flex flex-col items-center justify-center">
              Bringing stories to life with creativity and connection.
            </h1>
            <h3
              className={`${cedarvilleCursive.className} text-[20px] xl:text-[45px] w-full flex items-center justify-end`}>
              - Tejas Angadi
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse xl:flex-row items-center justify-between mt-[15%] h-full w-full gap-10 xl:gap-24">
        {/* Social media links */}
        <div className="flex flex-col p-6 w-[90%] shadow-lg rounded-lg bg-white">
          <h2 className="text-lg xl:text-xl font-semibold mb-6 text-center xl:text-start text-gray-800">
            Social Media Links
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              href="https://github.com/Tejas-Angadi-9"
              target="_blank"
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-sm">
              <p className="flex items-center text-sm xl:text-base font-medium text-gray-700">
                <FaGithub className="text-xl text-black mr-3" />
                GitHub
              </p>
              <FiExternalLink className="text-gray-500 text-lg" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tejasangadi9/"
              target="_blank"
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-sm">
              <p className="flex items-center text-sm xl:text-base font-medium text-gray-700">
                <FaLinkedin className="text-xl text-blue-600 mr-3" />
                LinkedIn
              </p>
              <FiExternalLink className="text-gray-500 text-lg" />
            </Link>
            <Link
              href="https://tejasangadi-portfolio.netlify.app/"
              target="_blank"
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-sm">
              <p className="flex items-center text-sm xl:text-base font-medium text-gray-700">
                <CgWebsite className="text-xl text-slate-800 mr-3" />
                Portfolio
              </p>
              <FiExternalLink className="text-gray-500 text-lg" />
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col items-center text-center lg:text-left p-6 xl:p-12 bg-white text-gray-800 rounded-lg shadow-lg gap-4">
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
            Welcome to BlogCanvas! 🌟
          </h1>
          <p className="text-sm lg:text-lg text-center leading-relaxed mb-4">
            Created by <span className="font-semibold">Tejas Angadi</span>,{" "}
            <span className="font-semibold">
              Automation Test and Full Stack Engineer at{" "}
              <span className="text-[#000048]">Cognizant</span> {"  "}
            </span>{" "}
            Passionate about web development, DSA problem-solving, and crafting
            scalable solutions using tools like React, Next.js, and Tailwind
            CSS. Proficient in testing with Selenium and Robot Framework, and
            coding in Python, Java, C++, JavaScript and TypeScript.
            <br />
            <br />
            <p className="font-medium text-sm lg:text-lg">
              I also do freelance work. Contact for more info.
            </p>
          </p>

          <div className="flex flex-col items-center gap-3 text-sm md:text-lg text-center">
            <p className="text-sm md:text-lg">
              For inquiries or feedback, feel free to reach out:
            </p>
            <Link
              href="mailto:tejasangadi456@gmail.com"
              className="text-blue-600 font-medium text-[13px] xl:text-base hover:underline">
              Email: tejasangadi456@gmail.com
            </Link>
            <Link
              href="tel:+919353423811"
              className="text-blue-600 font-medium text-[13px] xl:text-base hover:underline">
              Phone: +91 - 9353423811
            </Link>
          </div>
          <p className="font-medium text-md xl:text-xl text-center mt-4">
            Dive in and enjoy the journey! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
