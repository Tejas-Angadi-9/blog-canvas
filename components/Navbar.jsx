"use client";
import Link from "next/link";
import { useState } from "react";
import { useLockBodyScroll } from "react-use";
import { useAuth } from "@/app/contexts/AuthContext";

import NavbarContents from "./NavbarContents";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (isOpen) {
    useLockBodyScroll(true);
  } else {
    useLockBodyScroll(false);
  }

  const userData = isUserLoggedIn?.user;

  const logoutHandler = () => {
    localStorage.removeItem("UserData");
    setIsUserLoggedIn(null);
    router.push("/");
    toast.success("Logged out!");
  };

  return (
    <div className="w-full px-5 mt-3 xl:mt-0 sticky top-0 bg-white z-20 flex h-14 xl:h-24 mx-auto">
      <div className="px-5 py-2 xl:px-10 xl:py-5 border-gray-950 flex w-full items-center justify-between">
        {/* Logo and the app name */}
        <div className="flex">
          <Link href={"/"}>
            <h1 className="text-[26px] xl:text-[35px]">
              Blog<span className="font-bold">Canvas</span>
            </h1>
          </Link>
        </div>
        {/* Contents */}
        <NavbarContents type="desktop" />
        {/* Mobile Navigation 3 dashes */}
        <div className="xl:hidden flex items-center justify-center gap-6">
          {userData?.profileImage && (
            <div className="relative">
              <button
              // onClick={logoutHandler}
              >
                <div className="flex gap-1 items-center justify-center">
                  <img
                    src={userData.profileImage}
                    width={35}
                    className="rounded-full"
                    loading="lazy"
                    alt="User Profile"
                  />
                  {/* <IoMdArrowDropdown className="text-[22px]" /> */}
                </div>
              </button>

              <div className="absolute hidden top-14 w-[100px] h-fit bg-white xl:flex flex-col gap-2 items-start justify-between rounded-md">
                <Link
                  className="p-2 flex items-center justify-center gap-2"
                  href={"/profile"}>
                  <IoPersonSharp />
                  <p>Profile</p>
                </Link>
                <button
                  className="p-2 flex items-center justify-center gap-2"
                  onClick={logoutHandler}>
                  <RiLogoutBoxLine />
                  <p>Logout</p>
                </button>
              </div>
            </div>
          )}
          <div
            className="flex flex-col items-center -mt-2 gap-1 xl:hidden cursor-pointer overflow-auto"
            onClick={() => setIsOpen((prev) => !prev)}>
            <div
              className={`bg-black h-1 w-6 ${
                isOpen ? " rotate-45" : ""
              } rounded-sm origin-left ease-in-out duration-300  z-20`}></div>
            <div
              className={`bg-black h-1 w-6 ${
                isOpen ? " opacity-0" : ""
              } rounded-sm ease-in-out duration-300 z-20`}></div>
            <div
              className={`bg-black h-1 w-6 ${
                isOpen ? "-rotate-45" : ""
              } rounded-sm origin-left ease-in-out duration-300 z-20`}></div>
            {isOpen && <NavbarContents type="mobile" />}
          </div>
        </div>

        <div className="hidden xl:block">
          <div>
            {userData?.profileImage && (
              <div className="relative group">
                <button>
                  <div className="flex gap-1 items-center justify-center">
                    <img
                      src={userData.profileImage}
                      width={42}
                      className="rounded-full"
                      loading="lazy"
                      alt="User Profile"
                    />
                    <IoMdArrowDropdown className="text-[22px]" />
                  </div>
                </button>

                <div className="absolute top-12 -left-10 w-[150px] h-fit bg-white border-2 flex-col items-start justify-between rounded-md px-2 hidden group-hover:block">
                  <div className="flex flex-col items-start justify-center">
                    <Link
                      className="p-2 flex items-center justify-center gap-2"
                      href={"/profile"}>
                      <IoPersonSharp />
                      <p>Profile</p>
                    </Link>
                    <button
                      className="p-2 flex items-center justify-center gap-2 text-red-500"
                      onClick={logoutHandler}>
                      <RiLogoutBoxLine />
                      <p>Logout</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hidden xl:block">
            {!isUserLoggedIn && (
              <div className="flex gap-2 items-center justify-center">
                <Link href={"/auth"}>
                  <p className="duration-200 hover:scale-95 px-4 py-2 outline-none rounded-md">
                    Login / Signup
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
