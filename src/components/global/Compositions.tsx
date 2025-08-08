"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface Blog {
  id: number;
  title: string;
  image: string | null;
  slug: string;
  created_at: string;
  content?: string;
}

const Compositions = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-md text-white text-center font-poppins bg-[#4A596B] flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-0">
        <h1 className="text-2xl font-semibold mb-2">लेख / रचनाहरु </h1>
        <p className="text-white/80">Blogs</p>
      </div>

      {/* Slider */}
      <div className="w-full mt-4 px-4 sm:px-20">
        {blogs.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
            }}
            modules={[Autoplay]}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="bg-white text-gray-800 rounded shadow p-4">
                  <img
                    src={
                      blog.image
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${blog.image}`
                        : "/default-blog-image.jpg"
                    }
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Compositions;
