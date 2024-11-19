import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarContents = ({ type }) => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const router = useRouter();

  const userData = isUserLoggedIn?.user;

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
      toast(
        "Login before to create a blog",
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
          : "hidden md:flex gap-12 text-[18px] font-medium"
      } `}>
      <div>
        {type === "mobile" && (
          <h1 className="text-[30px] border-b-2 border-black rounded-none pb-2">
            Blog<span className="font-bold">Canvas</span>
          </h1>
        )}
      </div>
      <div className="flex items-center justify-center w-full gap-16">
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
        {userData?.profileImage ? (
          <button className="relative" onClick={logoutHandler}>
            <img
              src={userData.profileImage}
              width={50}
              className="rounded-full"
              loading="lazy"
              alt="User Profile"
            />
          </button>
        ) : (
          !isUserLoggedIn && (
            <Link href={"/auth"}>
              <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
                Login / Signup
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default NavbarContents;
