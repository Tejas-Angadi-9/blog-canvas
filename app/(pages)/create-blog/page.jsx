import React from "react";

const CreateABlogPage = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-11/12 h-full mx-auto">
      {/* This div will contain the fixed title to create the blog post */}
      <div className="p-2 md:p-10">
        <h1 className="text-[20px] md:text-[40px] font-bold">
          Unleash Your Voice: Create a Blog Today!
        </h1>
        <p className="text-[14px] md:text-[20px] text-gray-700 mt-2">
          Share your story, idea, or experience - start your blog today.
        </p>
      </div>
      {/* This below div contains the some inputs fields and the create button */}
      <div>
        <form action=""></form>
      </div>
    </div>
  );
};

export default CreateABlogPage;
