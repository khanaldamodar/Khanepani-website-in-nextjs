"use client";

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface GalleryItem {
  id: number;
  title: string;
  images: string[];  // relative paths
  category: string | null;
}

const Awards = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 16 },
      },
    },
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}gallery`, { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to fetch gallery data");

        const data: GalleryItem[] = await res.json();

        // Filter only items with category exactly "awards" (case insensitive)
        const awardsItems = data.filter(
          (item) => item.category?.toLowerCase() === "awards"
        );

        setGalleryItems(awardsItems);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading)
    return (
      <p className="text-white text-center p-6 font-poppins">Loading awards...</p>
    );

  if (galleryItems.length === 0)
    return (
      <p className="text-white text-center p-6 font-poppins">
        No awards to show.
      </p>
    );

  return (
    <div className="p-6 rounded-lg shadow-md text-white text-center font-poppins bg-[#4A596B] flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-0">
        <h1 className="text-2xl font-semibold mb-2">Awards</h1>
        <p>Our Awards and achievements</p>
      </div>

      <div ref={sliderRef} className="keen-slider w-full mt-4 px-4 sm:px-20">
        {galleryItems.flatMap((item) =>
          item.images.map((img, index) => (
            <div
              key={`${item.id}-${index}`}
              className="keen-slider__slide bg-white rounded shadow overflow-hidden"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${img}`}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-3 text-center text-sm font-medium text-gray-700">
                {item.title}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Awards;
