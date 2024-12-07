import React from "react";

const profileTopPart = () => {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Your Profile
      </h1>
      <p className="text-sm sm:text-base text-gray-600 leading-6">
        Manage your account details, update your profile picture, and explore
        your activity on BlogCanvas.
      </p>
    </div>
  );
};

export default profileTopPart;
