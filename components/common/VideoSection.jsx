import React from "react";

const VideoSection = () => {
  return (
    <section className="w-full bg-white py-10 flex flex-col items-center justify-center mx-auto">
      <div className="max-w-3xl px-6 text-center space-y-6 flex flex-col items-center justify-center gap-4">
        <h2 className="text-[20px] md:text-3xl font-semibold text-gray-900">
          See BlogCanvas in Action! 🎥
        </h2>
        <p className="text-gray-700 text-[14px] md:text-lg font-light leading-relaxed">
          Discover how <span className="font-semibold">Blog</span>
          <span className="font-bold">Canvas</span> can transform your blogging
          experience. Watch the demo below.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
          <iframe
            className="w-full h-60 md:h-96"
            src="https://www.youtube.com/embed/4lQ2PxNkul8?si=ybQebYvDeE4bo5b4"
            title="BlogCanvas Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
