"use client";
import Blogs from "@/components/Blogs";
import HeroSection from "@/components/HeroSection";
import { useAuth } from "./contexts/AuthContext";
import Loading from "@/components/common/Loading";
import VideoSection from "@/components/common/VideoSection";

export default function Home() {
  const { allBlogsData, blogsLoading } = useAuth();
  const blogs = allBlogsData?.blogs;

  if (blogsLoading) return <Loading />;

  return (
    <div className="xl:w-11/12 w-full h-100% flex flex-col mx-auto p-5 xl:p-10 gap-10 relative mb-10">
      {!blogs?.length ? (
        <h1 className="flex w-full h-[75vh] items-center justify-center mx-auto text-[22px] xl:text-[40px] font-semibold">
          No Blogs Found
        </h1>
      ) : (
        <>
          <section className="flex flex-col gap-4">
            <HeroSection />
          </section>
          <VideoSection />
          {/* 2nd Section where all blogs are displayed in grid */}
          <section className="flex flex-col gap-4 w-[95%] items-center justify-center mx-auto">
            <Blogs page="homePage" />
          </section>
        </>
      )}
    </div>
  );
}
