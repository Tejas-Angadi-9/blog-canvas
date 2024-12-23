import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-between p-4 sm:p-6 xl:p-10">
      {/* About section with email and phone number */}
      <div className="flex flex-col items-start gap-4 sm:gap-5 w-11/12 mx-auto my-3 sm:my-5">
        <div className="flex flex-col items-start gap-3 w-full sm:w-[75%] xl:w-[50%]">
          <h3 className="text-[18px] sm:text-[20px] xl:text-[22px] font-semibold text-black">
            About Me
          </h3>
          <p className="text-[14px] sm:text-[15px] xl:text-[18px] font-light text-slate-500">
            Hi, I'm <b>Tejas Angadi</b>, a passionate{" "}
            <b> full stack developer</b> and <b>problem solver</b> with
            expertise in
            <b>
              {" "}
              React.js, Next.js, Express.js, Node.js, MongoDB, and Tailwind CSS
            </b>
            . I specialize in building full-stack applications and tackling DSA
            problems...
            <span className="text-blue-500">
              <Link href="/about"> Read More</Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col text-slate-500 gap-1 sm:gap-2 text-[14px] xl:text-lg">
          <p id="contact">
            <b>Email:</b>{" "}
            <Link
              href="mailto:tejasangadi456@gmail.com"
              className="cursor-pointer">
              tejasangadi456@gmail.com
            </Link>
          </p>
          <p>
            <b>Phone:</b>{" "}
            <Link href="tel:+919353423811" className="cursor-pointer">
              +91 - 9353423811
            </Link>
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[1px] w-11/12 bg-slate-400 rounded-md mt-3 sm:mt-5"></div>

      {/* Footer Section */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-1">
        <p className="font-bold text-[14px] sm:text-[16px] xl:text-[18px]">
          <span className="font-normal">Blog</span>Canvas
          <span className="text-[12px] sm:text-[14px] xl:text-[16px] font-normal">
            © 2024 Tejas Angadi.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
