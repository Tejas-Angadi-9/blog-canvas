import React from "react";

const VerifyingLink = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mx-auto gap-2 text-center">
      <div className="animate-spin rounded-full w-10 h-10 md:h-20 md:w-20 border-t-2 border-blue-500 border-solid mx-auto mb-4"></div>
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700">
        Verifying your link...
      </h2>
      <p className="mt-2 text-sm md:text-xl text-gray-500">
        Please wait while we verify your request. This process may take a few
        seconds.
      </p>
    </div>
  );
};

export default VerifyingLink;
