"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import Loading from "@/components/common/Loading";

import ProfileTopPart from "@/components/profilePage/profileSection/profileTopPart";
import ProfileInfo from "@/components/profilePage/profileSection/ProfileInfo";
import ActivityHeading from "@/components/profilePage/activitySection/ActivityHeading";
import ActivitySection from "@/components/profilePage/activitySection/ActivitySection";
import DeleteYourAccount from "@/components/profilePage/deleteSection/DeleteYourAccount";

const page = () => {  
  const { isUserLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEachUserDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
      const output = await response.json();
      setUserData(output?.userData);
      setNewName(output?.userData?.name);
    } catch (err) {
      console.log("Failed to fetch the user details: ", err.message);
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      window.location.href = "/";
      return;
    }
    getEachUserDetails();
  }, []);

  return (
    <div className="w-full h-full py-5 flex flex-col items-center">
      {!userData ? (
        <Loading />
      ) : (
        <div className="w-11/12 h-full flex flex-col items-start justify-between py-5">
          {/* Profile Section */}
          <div className="w-full h-full p-4 sm:p-8 flex flex-col items-start gap-8">
            {/* Profile Heading */}
            <ProfileTopPart />

            {/* Profile Info Section */}
            <ProfileInfo
              userData={userData}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          {/* Blogs Section */}
          <div className="w-full h-full p-2 flex flex-col">
            {/* This contains 2 sections */}
            {/* 1. Created Blogs by the user */}
            <ActivityHeading />

            {/* 2. Liked Blogs by the user */}
            <ActivitySection />
          </div>

          {/* Delete User Section */}
          <DeleteYourAccount loading={loading} setLoading={setLoading} />
        </div>
      )}
    </div>
  );
};

export default page;
