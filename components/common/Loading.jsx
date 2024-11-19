import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[200px] text-[20px] xl:text-[30px] flex flex-col items-center justify-center mx-auto gap-5">
      <span className="loader"></span>
      <h1 className="font-semibold">Loading....</h1>
    </div>
  );
};

export default Loading;
