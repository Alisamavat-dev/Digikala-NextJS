"use client";

import { useQuery } from "@tanstack/react-query";
import DeleteMediaBtn from "./delete-media-btn";

export default function MediaList() {
  const {
    data: media = [],
    isLoading,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        خطا در بارگذاری رسانه‌ها: {error.message}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        هیچ رسانه‌ای یافت نشد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
      {media.map((item) => (
        <div
          key={item._id}
          className="relative group rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow"
        >
          <img
            src={item.url}
            alt="media"
            className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <DeleteMediaBtn mediaId={item._id} onDelete={refetch} />
        </div>
      ))}
    </div>
  );
}
