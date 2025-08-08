"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface GalleryItem {
  id: number;
  title: string;
  category: string | null;
  images: string[];
}

interface Member {
  id: number;
  name: string;
  photo: string | null;
  position: string;
  type: string;
  number: string | null;
}

const GalleryWithMembers = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [boardMembers, setBoardMembers] = useState<Member[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}gallery`, { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data: GalleryItem[] = await res.json();
        setGalleryItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingGallery(false);
      }
    };

    const fetchMembers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}members`, { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to fetch members");
        const data: Member[] = await res.json();

        const filteredMembers = data.filter(
          (m) =>
            m.type === "board" &&
            ["Chairperson", "Office Chief", "Information Officer"].includes(
              m.position
            )
        );
        setBoardMembers(filteredMembers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchGallery();
    fetchMembers();
  }, []);

  return (
    <div className="px-6 py-10 font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Gallery Slider (2/3) */}
        <div className="w-full md:w-2/3">
          {loadingGallery ? (
            <Loader />
          ) : (
            <Swiper
              spaceBetween={12}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 10000 }}
              modules={[Autoplay]}
              className="rounded-lg overflow-hidden"
            >
              {galleryItems.flatMap((item) =>
                item.images.map((img, index) => (
                  <SwiperSlide key={`${item.id}-${index}`}>
                    <div className="relative text-white rounded shadow overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${img}`}
                        alt={item.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-center text-2xl font-medium p-3">
                        {item.title}
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          )}
        </div>

        {/* Board Members (1/3) */}
        <div className="w-full md:w-1/3">
          {loadingMembers ? (
            <p className="text-center text-gray-500">Loading members...</p>
          ) : boardMembers.length === 0 ? (
            <p className="text-center text-gray-500">No board members found.</p>
          ) : (
            <div className="grid gap-4">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 text-white shadow p-3 rounded"
                >
                  <img
                    src={
                      member.photo
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${member.photo}`
                        : "/default-member.jpg"
                    }
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full border"
                  />
                  <div>
                    <h3 className="font-semibold text-xl">{member.name}</h3>
                    <p className="text-sm text-white opacity-60">
                      {member.position}
                    </p>
                    <p className="text-xs text-white">{member.number}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryWithMembers;
