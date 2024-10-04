import React from "react";

const TagButton = ({text}) => {
  return (
    <h4 className="text-[10px] xl:text-[16px] px-2 py-1 xl:px-4 xl:py-2 bg-[#4B6BFB] inline text-white rounded-xl">
      {text}
    </h4>
  );
};

export default TagButton;
