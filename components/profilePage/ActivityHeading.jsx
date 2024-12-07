import React from "react";

const ActivityHeading = () => {
  return (
    <div className=" w-full h-fit py-2 flex flex-col items-start  gap-2">
      <h1 className="xl:text-[32px] text-[24px] font-bold">Your Activity</h1>
      <p className="xl:text-[16px] text-[14px] font-normal">
        Discover and manage your created and liked blogs in one convenient
        place.
      </p>
    </div>
  );
};

export default ActivityHeading;
