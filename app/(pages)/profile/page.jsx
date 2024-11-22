"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import { MdOutlineModeEdit } from "react-icons/md";
import NoPageFound from "@/components/common/NoPageFound";
import Blogs from "@/components/Blogs";
import Loading from "@/components/common/Loading";

const page = () => {
  const [userData, setUserData] = useState(null);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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

  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteAccount = () => {
    // Add your delete account logic here
    console.log("Account deleted");
    setShowModal(false); // Close modal after deletion
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
        <div className="w-11/12 h-full flex flex-col items-start justify-between py-5">
          {/* Profile Section */}
          <div className="w-full h-full p-4 sm:p-8 flex flex-col items-start gap-8">
            {/* Profile Heading */}
            <div className="w-full flex flex-col items-start gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Your Profile
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-6">
                Manage your account details, update your profile picture, and
                explore your activity on BlogCanvas.
              </p>
            </div>

            {/* Profile Info Section */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-16">
              {/* Profile Photo */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <img
                    src={userData?.profileImage || "/default-profile.png"}
                    alt="User Profile"
                    className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full shadow-md border border-gray-200"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                    onClick={() => setShowPhotoModal(true)}>
                    <MdOutlineModeEdit className="text-lg" />
                  </button>
                </div>
                <button
                  className="text-blue-500 text-sm sm:text-base font-medium hover:underline"
                  onClick={() => setShowPhotoModal(true)}>
                  Update Profile Photo
                </button>
              </div>

              {/* User Details */}
              <div className="w-full flex flex-col gap-4">
                {/* Name Section */}
                <div className="flex items-center w-[20%] gap-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {userData?.name || "John Doe"}
                  </h2>
                  <button
                    className="text-blue-500 text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
                    onClick={() => setShowNameModal(true)}>
                    <span>Update Name</span>
                    <MdOutlineModeEdit />
                  </button>
                </div>

                {/* Email Section */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="email"
                    className="text-sm sm:text-base font-medium text-gray-600">
                    Email:
                  </label>
                  <span
                    id="email"
                    className="bg-gray-100 px-3 py-2 rounded-md text-sm sm:text-base text-gray-800 w-full sm:w-auto cursor-not-allowed">
                    {userData?.email || "example@email.com"}
                  </span>
                </div>

                {/* Update Password Button */}
                <div>
                  <button
                    className="bg-blue-500 text-white text-sm sm:text-base px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                    onClick={() => setShowPasswordModal(true)}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Modals */}
            {(showPhotoModal || showNameModal || showPasswordModal) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-11/12 sm:w-1/3 rounded-lg shadow-lg p-6 flex flex-col gap-4">
                  {/* Close Button */}
                  <button
                    className="self-end text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setShowPhotoModal(false);
                      setShowNameModal(false);
                      setShowPasswordModal(false);
                    }}>
                    ✕
                  </button>

                  {/* Photo Modal Content */}
                  {showPhotoModal && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Update Profile Photo
                      </h2>
                      <div className="flex items-center justify-start gap-2">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                          Remove Photo
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                          Upload New Photo
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Name Modal Content */}
                  {showNameModal && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Update Name
                      </h2>
                      <input
                        type="text"
                        placeholder="Enter new name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                      />
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        Update Name
                      </button>
                    </div>
                  )}

                  {/* Password Modal Content */}
                  {showPasswordModal && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Update Password
                      </h2>
                      <input
                        type="password"
                        placeholder="Old Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                      />
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        Update Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Blogs Section */}
          <div className="w-full h-full p-2  flex flex-col">
            {/* This contains 2 sections */}
            {/* 1. Created Blogs by the user */}
            {/* 2. Liked Blogs by the user */}
            <div className=" w-full h-fit py-2 flex flex-col items-start  gap-2">
              <h1 className="xl:text-[32px] text-[24px] font-bold">
                Your Activity
              </h1>
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
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-8">
            <div className="w-[90%] xl:w-[60%] bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 items-start xl:items-center mx-auto">
              {/* Section Heading */}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Delete Your Account
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Deleting your account will permanently erase all your data and
                activity. This action cannot be undone.
              </p>
              {/* Delete Button */}
              <button
                className="mt-4 px-6 py-2 bg-red-500 text-white text-sm sm:text-base font-medium rounded-full shadow-md hover:bg-red-600 transition-all duration-200 hover:scale-95"
                onClick={() => setShowModal(true)} // Trigger modal here
              >
                Delete Account
              </button>
            </div>

            {/* Delete Account Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white w-10/12 sm:w-1/3 rounded-xl shadow-lg p-8 relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
                    onClick={() => setShowModal(false)}>
                    ✕
                  </button>

                  {/* Modal Content */}
                  <div className="flex flex-col items-center gap-6">
                    {/* BlogCanvas Branding */}
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg font-bold text-gray-800">
                        BlogCanvas
                      </h1>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                      Confirm Deletion
                    </h2>
                    {/* Message */}
                    <p className="text-sm text-gray-600 text-center">
                      Are you sure you want to delete your account? This action
                      is permanent and cannot be undone.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                      <button
                        className="px-6 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
                        onClick={() => setShowModal(false)} // Close Modal
                      >
                        Cancel
                      </button>
                      <button
                        className="px-6 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                        onClick={handleDeleteAccount} // Trigger Account Deletion
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
