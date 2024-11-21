"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import { MdOutlineModeEdit } from "react-icons/md";
import NoPageFound from "@/components/common/NoPageFound";
import Blogs from "@/components/Blogs";
import Loading from "@/components/common/Loading";

const page = () => {
  const { isUserLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);

  console.log("Liked Blogs: ", likedBlogs);
  console.log("created Blogs: ", createdBlogs);

  const [switcher, setSwitcher] = useState(true);

  const getCreatedandLikedBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/blogs");
      const output = await response.json();
      setCreatedBlogs(output?.userData?.createdBlogs);
      setLikedBlogs(output?.userData?.likedBlogs);
    } catch (err) {
      console.log("Failed to fetch created Blogs");
    }
  };

  console.log("createdBlogs : ", createdBlogs);

  const getEachUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user");
      const output = await response.json();

      console.log("Output: ", output);
      setUserData(output?.userData);
    } catch (err) {
      console.log("Failed to fetch the user details: ", err.message);
    }
  };

  useEffect(() => {
    getEachUserDetails();
    getCreatedandLikedBlogs();
  }, []);

  return (
    <div className="w-full h-full py-5 flex flex-col items-center">
      {!userData ? (
        <Loading />
      ) : (
        <div className="w-11/12 h-full flex flex-col items-start justify-between ">
          {/* Profile Section */}
          <div className="w-full h-full p-4  flex flex-col items-start justify-between gap-5">
            {/* Profile Heading */}
            <div className=" w-full h-fit py-5 flex flex-col items-start  gap-2">
              <h1 className="xl:text-[32px] text-[24px] font-bold">
                Your Profile
              </h1>
              <p className="xl:text-[16px] text-[14px] font-normal">
                Manage your account details, update your profile picture, and
                explore your activity on BlogCanvas.
              </p>
            </div>
            <div className="w-full h-full flex flex-col items-start ">
              <div className="flex flex-row w-full h-full  p-5 gap-10">
                {/* Profile photo with update option */}
                <div className="flex flex-col items-center justify-center relative">
                  <img
                    src={userData?.profileImage}
                    alt="UserProfile.jpg"
                    width={120}
                    height={120}
                    className="rounded-full object-contain"
                    loading="lazy"
                  />
                  <button className="absolute top-[55%] right-0 bg-white rounded-full  w-8 h-8 flex items-center justify-center">
                    <MdOutlineModeEdit />
                  </button>
                </div>
                {/* User Name with update option*/}
                <div className="w-full h-full flex flex-col items-start justify-evenly gap-5">
                  {/* This contains the name and the email section */}
                  <div className="w-fit h-fit flex flex-row items-center gap-4">
                    <h2 className="text-[24px]">{userData?.name}</h2>
                    <button className="text-[14px] text-blue-500 font-light">
                      <div className="flex w-fit h-fit items-center justify-center gap-2">
                        <h4>Update Name</h4>
                        <MdOutlineModeEdit />
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-around gap-2 text-[18px]">
                    {/* Email */}
                    <label htmlFor="email: ">Email: </label>
                    <input
                      type="text"
                      id="email"
                      readOnly
                      className="bg-gray-200 p-2 w-full h-fit rounded-md cursor-not-allowed text-[16px]"
                      value={userData?.email}
                    />
                  </div>
                  <div>
                    <button className="flex w-fit h-fit px-2 py-1 items-center justify-center bg-blue-500 text-white rounded-md text-[14px]">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Update Password button which opens a modal */}
          </div>
          {/* Blogs Section */}
          <div className="w-full h-full p-2  flex flex-col">
            {/* This contains 2 sections */}
            {/* 1. Created Blogs by the user */}
            {/* 2. Liked Blogs by the user */}
            <div className=" w-full h-fit py-2 flex flex-col items-start  gap-2">
              <h1 className="xl:text-[32px] text-[24px] font-bold">Activity</h1>
              <p className="xl:text-[16px] text-[14px] font-normal">
                Discover and manage your created and liked blogs in one
                convenient place.
              </p>
            </div>
            <div className="w-full py-2">
              <div className="flex w-fit  items-center justify-between gap-5 py-2 text-[16px]">
                <button
                  className={`px-4 py-2 rounded-md shadow-lg hover:scale-95 transition-all duration-200 ${
                    switcher && "bg-gray-200"
                  }`}
                  onClick={() => setSwitcher(true)}>
                  Created Blogs
                </button>
                <button
                  className={`px-4 py-2 rounded-md shadow-lg hover:scale-95 transition-all duration-200 ${
                    !switcher && "bg-gray-200"
                  }`}
                  onClick={() => setSwitcher(false)}>
                  Liked Blogs
                </button>
              </div>
              <div className="flex flex-col w-full  py-6 items-center justify-between gap-5">
                {switcher ? (
                  <div className="flex flex-col gap-4 xl:items-center xl:justify-center xl:mx-auto">
                    <Blogs text="Created" blogsProp={createdBlogs} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 xl:items-center xl:justify-center xl:mx-auto">
                    <Blogs text="Liked" blogsProp={likedBlogs} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delete User Section */}
          <div className="w-full ">
            {/* Display a single button named delete where the user can delete their account. When the user clicks on this, a new modal should open and take the confirmation from the user. If yes, then delete the account */}
            <div className="flex flex-col w-full h-fit  gap-2">
              <h1>Want to delete your account?</h1>
              <button className="w-fit bg-red-500 text-white px-4 py-2 text-[16px] rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
