import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarContents = ({ type }) => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("UserData");
    setIsUserLoggedIn(null);
    router.push("/");
    toast.success("Logged out!");
  };

  const createNewBlogChecker = () => {
    if (isUserLoggedIn) {
      router.push("/create-blog");
    } else {
      toast.error(
        "Login before creating a new blog",
        { duration: 4000 },
        { style: { fontSize: "17px", marginTop: "18px" } },
      );
    }
  };

  return (
    <div
      className={`${
        type === "mobile"
          ? "flex flex-col absolute items-center justify-center -translate-y-[5%] left-[50%] -translate-x-[50%] gap-12 text-[18px] bg-white z-10 w-full h-[100vh] transition-all duration-200 font-semibold"
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
        <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
          Home
        </p>
      </Link>
      <Link href={"/blogs"}>
        <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
          All Blogs
        </p>
      </Link>
      {/* {isUserLoggedIn && ( */}
      <button onClick={createNewBlogChecker}>
        <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
          Create A Blog
        </p>
      </button>
      {/* )} */}
      <Link href={"/about"}>
        <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
          About
        </p>
      </Link>
      {isUserLoggedIn && (
        <button onClick={logoutHandler}>
          <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
            Logout
          </p>
        </button>
      )}
      {!isUserLoggedIn && (
        <Link href={"/auth"}>
          <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-xl">
            Login / Signup
          </p>
        </Link>
      )}
    </div>
  );
};

export default NavbarContents;
