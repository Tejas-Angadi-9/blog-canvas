"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import { MdOutlineModeEdit } from "react-icons/md";
import Blogs from "@/components/Blogs";
import toast from "react-hot-toast";

import Spinner from "@/components/common/Spinner";
import Loading from "@/components/common/Loading";

const page = () => {
  const { isUserLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [switcher, setSwitcher] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [newName, setNewName] = useState(userData?.name);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const uploadPhotoHanlder = async () => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/updateUser`,
        { method: "PATCH", body: formData },
      );
      const output = await response.json();

      if (response.ok) {
        toast.success(output.message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else if (response.status === 404 || response.status === 500) {
        toast.error(output.message);
      }
    } catch (err) {
      console.log("Failed while uploading new profile photo");
    } finally {
      setLoading(false);
    }
  };

  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const getCreatedandLikedBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/blogs`);
      const output = await response.json();
      setCreatedBlogs(output?.userData?.createdBlogs);
      setLikedBlogs(output?.userData?.likedBlogs);
    } catch (err) {
      console.log("Failed to fetch created Blogs");
    }
  };

  const getEachUserDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user`);
      const output = await response.json();
      setUserData(output?.userData);
      setNewName(output?.userData?.name);
    } catch (err) {
      console.log("Failed to fetch the user details: ", err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user`, {
        method: "DELETE",
      });
      const output = await response.json();
      setLoading(false);
      if (response.ok) {
        localStorage.removeItem("UserData");
        // cookieStore.delete("authToken");
        toast.success("Account deleted successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (err) {
      console.log("Failed to delete the account: ", err.message);
      toast.error("Failed to delete the account");
    } finally {
      setLoading(false);
    }
  };

  const removePhotoHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/removeProfileImage`,
        { method: "PATCH" },
      );

      const output = await response.json();

      if (response.ok) {
        toast.success("Removed Photo successfully!");
        setTimeout(() => {
          window.location.reload();
        }, [1000]);
      } else if (response.status === 404) {
        toast.error("Can't remove the photo, Please try again!");
      }
    } catch (err) {
      console.log(
        "Internal server issue while removing the photo: ",
        err.message,
      );
      toast.error("Error while removing the profile photo");
    } finally {
      setLoading(false);
    }
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordState((prev) => ({ ...prev, [name]: value }));
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (passwordState.newPassword !== passwordState.confirmNewPassword) {
      setWarning(true);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/updatePassword`,
        {
          method: "PATCH",
          body: JSON.stringify({
            oldPassword: passwordState.oldPassword,
            newPassword: passwordState.newPassword,
            confirmNewPassword: passwordState.confirmNewPassword,
          }),
        },
      );
      const output = await response.json();
      if (response.ok) {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, [1000]);
      } else if (response.status === 404 || response.status === 400) {
        toast.error(output.message);
      }
      setWarning(false);
    } catch (err) {
      console.log(
        "Internal server issue while updating password: ",
        err.message,
      );
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nameHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newName);

    updateName(formData);
  };

  const checkProfileImage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/checkProfilePhoto`,
        {
          method: "PATCH",
          body: JSON.stringify({
            updatedName: newName,
          }),
        },
      );
      const output = await response.json();

      if (response.ok) {
        return;
      } else if (response?.status === 404) {
        return;
      }
    } catch (err) {
      console.log("Internal server issue while checking the profileImage");
    }
  };

  const updateName = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/updateUser`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      const output = await response.json();

      if (response.ok) {
        toast.success("Name updated successfully!");
        checkProfileImage();
        setTimeout(() => location.reload(), [1000]);
      } else if (response?.status === 404) {
        toast.error(output.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      window.location.href = "/";
      return;
    }
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
                    src={userData?.profileImage}
                    alt="User Profile"
                    className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full shadow-md border border-gray-200"
                    loading="lazy"
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
                    {userData?.name}
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
                    {userData?.email}
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
                      {loading ? (
                        <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                          <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                            <Spinner />
                          </div>
                        </div>
                      ) : (
                        <>
                          {uploadingPhoto ? (
                            <>
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Upload New Profile Photo
                              </h2>
                              <div className="flex flex-col">
                                <label
                                  htmlFor="profileImage"
                                  className="text-base xl:text-lg font-semibold text-gray-700">
                                  Choose an Image:
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="profileImage"
                                  id="profileImage"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="profileImage"
                                  className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 transition duration-150 text-center">
                                  {imagePreview ? (
                                    <>
                                      <img
                                        src={imagePreview}
                                        alt="Selected"
                                        className="h-32 object-cover rounded-md mb-2"
                                        loading="lazy"
                                      />
                                      <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-fit"
                                        onClick={uploadPhotoHanlder}>
                                        Upload Photo
                                      </button>
                                    </>
                                  ) : (
                                    <p>Click to choose an image</p>
                                  )}
                                </label>
                              </div>
                              <div className="flex justify-end mt-4">
                                <button
                                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                  onClick={() => setUploadingPhoto(false)}>
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h2 className="text-xl font-semibold text-gray-800">
                                Update Profile Photo
                              </h2>
                              <div className="flex items-center justify-start gap-2 mt-4">
                                <button
                                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                                  onClick={removePhotoHandler}>
                                  Remove Photo
                                </button>
                                <button
                                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                  onClick={() => setUploadingPhoto(true)}>
                                  Upload New Photo
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Name Modal Content */}
                  {showNameModal && (
                    <div>
                      {/* {loading ? (
                        <Loading />
                      ) : ( */}
                      {/* <> */}
                      <h2 className="text-xl font-semibold text-gray-800">
                        Update Name
                      </h2>
                      <input
                        type="text"
                        placeholder="Enter new name"
                        value={newName}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                        onChange={(e) => setNewName(e.target.value)}
                        required
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={nameHandler}>
                        {loading ? "Updating..." : "Update Name"}
                      </button>
                      {/* </> */}
                      {/* )} */}
                    </div>
                  )}

                  {/* Password Modal Content */}
                  {showPasswordModal && (
                    <div>
                      {loading ? (
                        <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <h2 className="text-xl font-semibold text-gray-800">
                            Update Password
                          </h2>
                          <form onSubmit={updatePasswordHandler}>
                            <input
                              type="password"
                              name="oldPassword"
                              placeholder="Old Password"
                              value={passwordState.oldPassword}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                              onChange={passwordChangeHandler}
                              required
                            />
                            <input
                              type="password"
                              name="newPassword"
                              placeholder="New Password"
                              value={passwordState.newPassword}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                              onChange={passwordChangeHandler}
                              required
                            />
                            <input
                              type="password"
                              name="confirmNewPassword"
                              placeholder="Confirm Password"
                              value={passwordState.confirmNewPassword}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                              onChange={passwordChangeHandler}
                              required
                            />
                            {warning && (
                              <div className="text-red-500">
                                Passwords doesn't match
                              </div>
                            )}
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                              type="submit">
                              Update Password
                            </button>
                          </form>
                        </>
                      )}
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
                        <span className="font-normal">Blog</span>Canvas
                      </h1>
                    </div>
                    {loading ? (
                      <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        {/* Title */}
                        <h2 className="text-xl font-semibold text-gray-800 text-center">
                          Confirm Deletion
                        </h2>
                        {/* Message */}
                        <p className="text-sm text-gray-600 text-center">
                          Are you sure you want to delete your account? This
                          action is permanent and cannot be undone.
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
                      </>
                    )}
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
