import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-between p-6 xl:p-10">
      {/* About section with email and phone number */}
      <div className="flex flex-col items-start gap-5 xl:gap-5 w-11/12 mx-auto my-2 xl:my-5">
        <div className="flex flex-col items-start gap-3 xl:w-[50%]">
          <h3 className="text-[20px] xl:text-[22px] font-semibold text-black">
            About me
          </h3>
          <p className="text-[15px] xl:text-[18px] font-light text-slate-500">
            I am <b>Tejas Angadi</b>, a <b>web developer</b> skilled in{" "}
            <b>React.js, Express.js, MongoDB, Node.js, and Next.js</b>. I excel
            at creating responsive web applications and solving complex
            problems...
            <span className="text-blue-500">
              <Link href="/about"> Read More</Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col text-slate-600 gap-1">
          <p id="contact">
            <b>Email:</b>{" "}
            <Link
              href="mailto:tejasangadi456@gmail.com"
              className="cursor-pointer">
              tejasangadi456@gmail.com
            </Link>
          </p>
          <p>
            <b>Phone: </b>{" "}
            <Link href="tel:+919353423811" className="cursor-pointer">
              +91 - 9353423811
            </Link>
          </p>
        </div>
      </div>
      {/* BlogCanvas in bold with the copyright and year 2024. All rights reserved. Add your name */}
      <div className="h-[1px] w-11/12 bg-slate-400 rounded-md mt-2"></div>
      <div className="mt-5 flex flex-col xl:flex-row items-center justify-center gap-1">
        <p className="font-bold text-[16px] xl:text-[18px]">
          <span className="font-normal">Blog</span>Canvas
        </p>
        <p className="text-[14px]  xl:text-[16px]">
          © 2024 Tejas Angadi. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
