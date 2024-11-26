import Link from "next/link";
import React from "react";

const Modal = ({
  handleLoginAfterSignup,
  type = "login",
  isDeleteModalOpen,
  setDeleteModalOpen,
  confirmedDelete,
}) => {
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

      {type === "login" && (
        <>
          <p className="text-[18px] xl:text-[30px] font-semibold">
            User signed up successfully!
          </p>
          <p className="text-[14px] xl:text-[22px] font-semibold">
            Please Login
          </p>
          <Link
            href={"/auth"}
            className="bg-blue-500 text-white py-2 px-4 w-fit rounded-md duration-300 transition-all hover:scale-95"
            onClick={handleLoginAfterSignup}>
            Go to Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Modal;
