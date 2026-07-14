"use client";

import { useQuery } from "@tanstack/react-query";
import DeleteMediaBtn from "./delete-media-btn";
import Image from "next/image";

export default function MediaList() {
  const {
    data: media = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/media", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت رسانه‌ها");
      }

      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500 font-medium">
        خطا در بارگذاری رسانه‌ها: {error.message}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-5xl mb-3">🖼️</div>
        <p>هیچ رسانه‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {media.map((item) => (
          <div
            key={item._id}
            className="
              group
              relative
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={item.url}
                alt="media"
                fill
                className="
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-500
                "
                unoptimized
              />
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
              <DeleteMediaBtn mediaId={item._id} onDelete={refetch} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}