"use client";
import CreateBlogForm from "@/components/CreateBlogForm";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

const CreateABlogPage = () => {
  const router = useRouter();
  const { isUserLoggedIn } = useAuth();

  const [visiblePage, setVisiblePage] = useState(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/auth");
    } else {
      setVisiblePage(true);
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {visiblePage ? (
        <div className="flex flex-col w-11/12 h-full mb-10 mx-auto">
          {/* This div will contain the fixed title to create the blog post */}
          <div className="p-2 xl:p-10">
            <h1 className="text-[22px] xl:text-[40px] font-bold">
              Unleash Your Voice: Create a Blog Today!
            </h1>
            <p className="text-[16px] xl:text-[20px] text-gray-700 mt-2">
              Share your story, idea, or experience - start your blog today.
            </p>
          </div>
          {/* This below div contains the some inputs fields and the create button */}
          <div className="mt-5">
            <CreateBlogForm />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center mx-auto">
          <h1 className="xl:text-[40px] font-bold">Loading...</h1>
        </div>
      )}
    </>
  );
};

export default CreateABlogPage;
