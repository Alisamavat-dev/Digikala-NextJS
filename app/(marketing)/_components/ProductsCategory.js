"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/grid";

const defaultPlaceholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7Ui111Q0ppxCJctMroRHTZyzWKB28EV8sg&s";

export default function ProductsCategory() {
  const {
    data: categories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsCategory"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/category");
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات دسته‌بندی‌ها");
      }
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-3">
        <div className="w-full min-h-50 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-3">
        <div className="w-full min-h-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center max-w-sm">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-3">خطا: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 text-sm font-medium"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-3">
        <div className="w-full min-h-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center max-w-sm">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">دسته‌بندی‌ای یافت نشد</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-3">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              خرید بر اساس دسته‌بندی
            </h2>
            <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-sm shadow-red-500/25">
              {categories.length}
            </span>
          </div>

          <div className="hidden md:block">
            <Swiper
              modules={[Grid]}
              slidesPerView={4}
              grid={{
                rows: 2,
                fill: "row",
              }}
              spaceBetween={12}
              className="w-full"
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  grid: {
                    rows: 2,
                    fill: "row",
                  },
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 5,
                  grid: {
                    rows: 2,
                    fill: "row",
                  },
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 6,
                  grid: {
                    rows: 2,
                    fill: "row",
                  },
                  spaceBetween: 16,
                },
              }}
            >
              {categories.map((cat, index) => (
                <SwiperSlide
                  key={`desktop-${index}`}
                  className="p-0.5"
                >
                  <Link href={`/category/${cat._id}`} className="block group">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <Image
                        className="w-full max-w-20 rounded-lg group-hover:scale-105 transition-transform duration-300 object-contain"
                        src={cat.image || defaultPlaceholder}
                        alt={cat.name}
                        width={80}
                        height={80}
                      />
                      <p className="text-center overflow-hidden text-ellipsis text-[8px] sm:text-[9px] font-medium text-gray-700 group-hover:text-red-500 transition-colors mt-1 leading-tight max-w-20">
                        {cat.name}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="md:hidden">
            <Swiper
              modules={[Grid]}
              slidesPerView={3}
              grid={{
                rows: 3,
                fill: "row",
              }}
              spaceBetween={6}
              className="w-full"
              breakpoints={{
                480: {
                  slidesPerView: 4,
                  spaceBetween: 8,
                  grid: {
                    rows: 3,
                    fill: "row",
                  },
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                  grid: {
                    rows: 3,
                    fill: "row",
                  },
                },
              }}
            >
              {categories.map((cat, index) => (
                <SwiperSlide
                  key={`mobile-${index}`}
                  className="p-0.5"
                >
                  <Link href={`/category/${cat._id}`} className="block group">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <Image
                        className="w-full max-w-17.5 rounded-lg group-hover:scale-105 transition-transform duration-300 object-contain"
                        src={cat.image || defaultPlaceholder}
                        alt={cat.name}
                        width={70}
                        height={70}
                      />
                      <p className="text-center overflow-hidden text-ellipsis text-[7px] sm:text-[8px] font-medium text-gray-700 group-hover:text-red-500 transition-colors mt-0.5 leading-tight max-w-17.5">
                        {cat.name}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}