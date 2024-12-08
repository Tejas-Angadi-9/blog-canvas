import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarContents = ({ type }) => {
  const { isUserLoggedIn } = useAuth();
  const router = useRouter();

  const createNewBlogChecker = () => {
    if (isUserLoggedIn) {
      router.push("/create-blog");
    } else {
      toast(
        "Login to create a blog",
        { duration: 4000 },
        { style: { fontSize: "17px", marginTop: "18px" } },
      );
    }
  };

  return (
    <div
      className={`${
        type === "mobile"
          ? "flex flex-col absolute items-center justify-center left-[50%] -translate-x-[50%] gap-12 text-[18px] bg-white z-10 w-full h-screen transition-all duration-200 font-semibold"
          : "hidden xl:flex gap-12 text-[18px] font-medium"
      } `}>
      <div className="flex flex-col items-center justify-between h-fit">
        <div>
          {type === "mobile" && (
            <h1 className="text-[30px] border-b-2 border-black rounded-none mb-10">
              Blog<span className="font-bold">Canvas</span>
            </h1>
          )}
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-center w-full gap-10 xl:gap-16 overflow-auto pb-10 xl:pb-0 xl:overflow-hidden">
          <Link href={"/"}>
            <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
              Home
            </p>
          </Link>
          <Link href={"/blogs"}>
            <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
              All Blogs
            </p>
          </Link>
          <button onClick={createNewBlogChecker}>
            <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
              Create A Blog
            </p>
          </button>
          <Link href={"/about"}>
            <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
              About
            </p>
          </Link>
          {!isUserLoggedIn && (
            <Link href={"/auth"} className="xl:hidden visible">
              <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
                Login / Signup
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarContents;
