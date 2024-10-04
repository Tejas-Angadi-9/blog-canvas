import Link from "next/link";

const NavbarContents = ({ type }) => {
  return (
    <div
      className={`${
        type === "mobile"
          ? "flex flex-col absolute items-center justify-center top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] gap-12 text-[18px] bg-white z-10 w-full h-[100%] overflow-hidden transition-all duration-200 font-semibold"
          : "hidden xl:flex gap-12 text-[18px] font-medium"
      } `}>
      <div>
        {type === "mobile" && (
          <h1 className="text-[30px] border-b-2 border-black rounded-none pb-2">
            Blog<span className="font-bold">Canvas</span>
          </h1>
        )}
        {/* <div className="flex w-full h-1 bg-black rounded-lg inline"></div> */}
      </div>
      <Link href={"/"}>
        <p className="duration-200 hover:scale-95 hover:shadow-xl px-4 py-2 outline-none rounded-xl">
          Home
        </p>
      </Link>
      <Link href={"/blogs"}>
        <p className="duration-200 hover:scale-95 hover:shadow-xl px-4 py-2 outline-none rounded-xl">
          All Blogs
        </p>
      </Link>
      <Link href={"/create-blog"}>
        <p className="duration-200 hover:scale-95 hover:shadow-xl px-4 py-2 outline-none rounded-xl">
          Create A Blog
        </p>
      </Link>
      <Link href={"/about"}>
        <p className="duration-200 hover:scale-95 hover:shadow-xl px-4 py-2 outline-none rounded-xl">
          About
        </p>
      </Link>
      <Link href={"#contact"}>
        <p className="duration-200 hover:scale-95 hover:shadow-xl px-4 py-2 outline-none rounded-xl">
          Contact
        </p>
      </Link>
    </div>
  );
};

export default NavbarContents;
