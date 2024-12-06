import React from "react";
import Link from "next/link";

const FailedToValidateToken = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 -translate-y-[50%]">
      <h2 className="text-[30px] font-medium">{message}</h2>
      <p className="text-[20px] font-medium">Please try again!</p>
      <Link
        href={"/auth/forgot-password"}
        className="px-4 py-2 w-fit h-full bg-red-500 text-center rounded-md text-white hover:scale-95 transition-all duration-200 text-[16px]"
      >
        Try Again!
      </Link>
    </div>
  );
};

export default FailedToValidateToken;
