import Link from "next/link";
import React from "react";

const Modal = ({
  handleLoginAfterSignup,
  type = "login",
  isDeleteModalOpen,
  setDeleteModalOpen,
  confirmedDelete,
  postSignupData,
}) => {
  const handleResendVerificationLink = () => {};
  return (
    <div className="flex flex-col items-center justify-center absolute z-10 bg-white p-8 w-[72%] h-[40%] xl:w-[40%] xl:h-[60%] rounded-md shadow-2xl gap-5">
      {type === "deleteBlog" && (
        <>
          <p className="text-[16px] xl:text-[30px] font-semibold text-center">
            Are you sure you want to delete this blog?
          </p>
          <div className="flex gap-4">
            <button
              className="text-black border-2 py-2 px-4 rounded-md duration-300 transition-all hover:scale-95"
              onClick={() => setDeleteModalOpen((prev) => !prev)}>
              Cancel
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md duration-300 transition-all hover:scale-95"
              onClick={confirmedDelete}>
              Delete
            </button>
          </div>
        </>
      )}

      {type === "signup" && (
        <div className="flex items-center justify-center w-full h-full flex-col gap-4 ">
          <p className="text-[20px] xl:text-[26px] font-bold text-gray-800">
            Check Your Email!
          </p>
          <p className="text-[16px] xl:text-[22px] font-medium text-gray-600 mt-2">
            A verification link has been sent to your email address. Please
            check your inbox to verify your account.
          </p>
          <p className="text-[14px] xl:text-[20px] text-gray-500 mt-1">
            Didn't receive the email? Please check your spam folder or try
            again.
          </p>
          <button
            onClick={() => location.reload()}
            className="bg-blue-500 text-white py-2 px-6 mt-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
            Sign up again
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
