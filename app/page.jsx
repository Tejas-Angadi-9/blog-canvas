"use client";
import Blogs from "@/components/Blogs";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="xl:w-11/12 h-100% flex flex-col mx-auto p-10 gap-10 relative">
      {/* Top Section */}
      <section className="flex flex-col gap-4">
        <HeroSection />
      </section>
      {/* 2nd Section where all blogs are displayed in grid */}
      <section className="flex flex-col gap-4 md:items-center md:justify-center md:mx-auto">
        <Blogs page="homePage" />
      </section>
    </div>
  );
}
