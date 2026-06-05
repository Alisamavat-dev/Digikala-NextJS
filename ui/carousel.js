"use client";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({
  slideperview,
  navigation,
  pagination,
  breakpoints,
  spaceBetween,
  slideclassname,
  children,
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={slideperview}
      navigation={navigation}
      pagination={pagination}
      breakpoints={{ ...breakpoints }}
      spaceBetween={spaceBetween || 10}
      dir="rtl"
      className="w-full"
    >
      {children.map((el, index) => {
        return (
          <SwiperSlide key={index} className={`${slideclassname}`}>
            {el}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
