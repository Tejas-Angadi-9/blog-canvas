import React, { useEffect, useState } from "react";

import Blogs from "@/components/Blogs";

const ActivitySection = () => {
  //* Use States
  const [switcher, setSwitcher] = useState(true);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);

  //* Handlers
  const getCreatedandLikedBlogs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/blogs`,
      );
      const output = await response.json();
      console.log("OUTPUT: ", output);
      setCreatedBlogs(output?.userData?.createdBlogs);
      setLikedBlogs(output?.userData?.likedBlogs);
    } catch (err) {
      console.log("Failed to fetch created Blogs");
    }
  };

  //* Use Effect
  useEffect(() => {
    getCreatedandLikedBlogs();
  }, []);

  return (
    <div className="w-full py-2">
      <div className="flex w-fit items-center justify-between gap-5 py-2 text-[14px] lg:text-[16px]">
        <button
          className={`px-4 py-2 rounded-md shadow-lg hover:scale-95 transition-all duration-200 ${
            switcher && "bg-gray-200"
          }`}
          onClick={() => setSwitcher(true)}>
          Created Blogs
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow-lg hover:scale-95 transition-all duration-200 ${
            !switcher && "bg-gray-200"
          }`}
          onClick={() => setSwitcher(false)}>
          Liked Blogs
        </button>
      </div>
      <div className="flex flex-col w-full  py-6 items-center justify-between gap-5">
        {switcher ? (
          <div className="w-full flex flex-col gap-4 xl:items-center xl:justify-center xl:mx-auto">
            <Blogs text="Created" blogsProp={createdBlogs} />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 xl:items-center xl:justify-center xl:mx-auto">
            <Blogs text="Liked" blogsProp={likedBlogs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
