"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLockBodyScroll } from "react-use";

import NavbarContents from "./NavbarContents";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    useLockBodyScroll(true);
  } else {
    useLockBodyScroll(false);
  }

  //* Regular way to use vanilla JS to add and remove the classname to avoid scrolling action
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     document.body.classList.remove("no-scroll");
  //   }

  //   return () => {
  //     document.body.classList.remove("no-scroll");
  //   };
  // }, [isOpen]);

  return (
    <div className="w-11/12 flex h-24 mx-auto">
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
        <div
          className="flex flex-col items-center gap-1 xl:hidden cursor-pointer"
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
        {/* Search button */}
        {/* <div className="">
          
        </div> */}
        {/* Dark to light mode slider */}
        {/* <div className=""></div> */}
      </div>
    </div>
  );
};

export default Navbar;
