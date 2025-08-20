"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Failed to load compositions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-indigo-700 font-medium text-lg">
            Loading compositions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-700 font-medium text-lg text-center">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium text-lg">
            No compositions available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl font-poppins xl:px-30">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-200 p-3 rounded-full shadow-lg">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold  mb-2">
            लेख / रचनाहरु
          </h1>
          <p className=" text-lg font-medium">
            Literary Compositions & Blogs
          </p>
        </div>

        <div className="w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-indigo-300",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-indigo-600",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="!pb-12"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        blog.image
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${blog.image}`
                          : "/blog-post-illustration.png"
                      }
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-blue-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Blog
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-300 to-indigo-300 text-gray-600 font-semibold rounded-lg hover:from-blue-300 hover:to-blue-300 transition-all  hover:text-white duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Compositions;
