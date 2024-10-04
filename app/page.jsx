"use client";
import Blogs from "@/components/Blogs";
import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";

export default function Home() {
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs");
      const output = await response.json();
      console.log(output.blogs);
    } catch (err) {
      console.log("Failed to fetch the blogs from the backend: ", err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="xl:w-11/12 h-100% flex flex-col mx-auto p-10 gap-10">
      {/* Top Section */}
      <section className="flex flex-col gap-4">
        <HeroSection />
      </section>
      {/* 2nd Section where all blogs are displayed in grid */}
      <section className="flex flex-col gap-4">
        <Blogs page="homePage" />
      </section>
    </div>
  );
}
