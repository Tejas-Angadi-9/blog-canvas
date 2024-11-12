import React from "react";

const Loading = () => {
  return (
    <div className="w-srceen h-screen flex flex-col items-center justify-center gap-5">
      <span className="loader"></span>
      <h1 className="text-[50px] font-semibold">Loading....</h1>
    </div>
  );
};

export default Loading;
