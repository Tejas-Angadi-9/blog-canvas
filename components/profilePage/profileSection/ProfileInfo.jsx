import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import Spinner from "@/components/common/Spinner";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ProfileInfo = ({ userData, loading, setLoading }) => {
  //* Use States
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newName, setNewName] = useState(userData?.name);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [warning, setWarning] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //* Name Handlers
  const nameHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newName);

    updateName(formData);
  };

  const updateName = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/updateUser`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      const output = await response.json();

      if (response.ok) {
        toast.success("Updated Name!");
        checkProfileImage();
        setTimeout(() => location.reload(), [500]);
      } else if (response?.status === 404) {
        toast.error("Unable to update name");
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  //* Photo Handlers
  const checkProfileImage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/checkProfilePhoto`,
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

  const removePhotoHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/removeProfileImage`,
        { method: "PATCH" },
      );

      const output = await response.json();

      if (response.ok) {
        toast.success("Removed Profile Photo!");
        setTimeout(() => {
          window.location.reload();
        }, [500]);
      } else if (response.status === 404) {
        toast.error("Unable to remove photo please try again");
      }
    } catch (err) {
      console.log(
        "Internal server issue while removing the photo: ",
        err.message,
      );
      toast.error("Failed to remove profile photo try again");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadPhotoHandler = async () => {
    if (!selectedImage) {
      toast.error("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/updateUser`,
        { method: "PATCH", body: formData },
      );

      const output = await response.json();

      if (response.ok) {
        toast.success(output.message || "Profile photo updated successfully!");
        setTimeout(() => location.reload(), 500);
      } else {
        toast.error(
          output.message || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      console.error("Failed while uploading new profile photo:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //* Password Handlers
  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (passwordState.newPassword !== passwordState.confirmNewPassword) {
      setWarning(true);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/updatePassword`,
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
        toast.success("Updated Password!");
        setTimeout(() => {
          window.location.reload();
        }, [500]);
      } else if (response.status >= 400 && response.status <= 404) {
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

  const passwordChangeHandler = (e) => {
    setWarning(false);
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordState((prev) => ({ ...prev, [name]: value }));
  };

  const passwordTypeHandler = (fieldName) => {
    setIsPasswordVisible((prevData) => ({
      ...prevData,
      [fieldName]: !prevData[fieldName],
    }));
  };

  //* UseEffect
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-16">
      {/* Profile Photo */}
      <div className="flex flex-col items-start justify-center gap-4 w-full xl:w-fit">
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
        <div className="flex items-center w-full gap-5">
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
            className="bg-blue-500 text-white text-[14px] px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
            onClick={() => setShowPasswordModal(true)}>
            Update Password
          </button>
        </div>
      </div>
      {(showPhotoModal || showNameModal || showPasswordModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
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
                                {loading ? (
                                  <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                                    <Spinner />
                                  </div>
                                ) : (
                                  <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-fit"
                                    onClick={uploadPhotoHandler}>
                                    Upload Photo
                                  </button>
                                )}
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
                        <div className="flex items-center justify-start gap-2 mt-4 text-[12px] xl:text-lg">
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
                {loading ? (
                  <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                    <Spinner />
                  </div>
                ) : (
                  <form action="" onSubmit={nameHandler}>
                    <input
                      type="text"
                      placeholder="Enter new name"
                      value={newName}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 text-[14px] ${
                        loading && "pointer-events-none cursor-not-allowed"
                      }`}
                      type="submit">
                      {loading ? "Updating..." : "Update Name"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Password Modal Content */}
            {showPasswordModal && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Update Password
                </h2>
                {loading ? (
                  <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                    <Spinner />
                  </div>
                ) : (
                  <form onSubmit={updatePasswordHandler}>
                    <div className="relative">
                      <input
                        type={
                          isPasswordVisible.oldPassword ? "text" : "password"
                        }
                        name="oldPassword"
                        placeholder="Old Password"
                        value={passwordState.oldPassword}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                        onChange={passwordChangeHandler}
                        required
                      />
                      {isPasswordVisible.oldPassword ? (
                        <FaEyeSlash
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() => passwordTypeHandler("oldPassword")}
                        />
                      ) : (
                        <FaEye
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() => passwordTypeHandler("oldPassword")}
                        />
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={
                          isPasswordVisible.newPassword ? "text" : "password"
                        }
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordState.newPassword}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                        onChange={passwordChangeHandler}
                        required
                      />
                      {isPasswordVisible.newPassword ? (
                        <FaEyeSlash
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() => passwordTypeHandler("newPassword")}
                        />
                      ) : (
                        <FaEye
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() => passwordTypeHandler("newPassword")}
                        />
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={
                          isPasswordVisible.confirmNewPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={passwordState.confirmNewPassword}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                        onChange={passwordChangeHandler}
                        required
                      />
                      {isPasswordVisible.confirmNewPassword ? (
                        <FaEyeSlash
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() =>
                            passwordTypeHandler("confirmNewPassword")
                          }
                        />
                      ) : (
                        <FaEye
                          className="absolute right-4 top-5 text-slate-400 cursor-pointer text-[16px]"
                          onClick={() =>
                            passwordTypeHandler("confirmNewPassword")
                          }
                        />
                      )}
                    </div>
                    {warning && (
                      <div className="text-red-500">
                        Passwords doesn't match
                      </div>
                    )}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 text-[14px]"
                      type="submit">
                      Update Password
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
