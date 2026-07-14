"use client";

import Carousel from "@/ui/carousel";
import calcsale from "@/utils/calcSale";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export default function ShegeftAngiz() {
  const {
    data: res,
    isPending,
    error,
  } = useQuery({
    queryKey: ["shegeftAngiz"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/product");
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
      return res.json();
    },
  });

  const products = res?.data || res?.products || res || [];
  const discountProducts = products.filter(
    (product) => Number(product.sale) > 0,
  );

  const defaultPlaceholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7Ui111Q0ppxCJctMroRHTZyzWKB28EV8sg&s";

  if (isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6">
          <div className="flex justify-center items-center min-h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D82F4E]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="border border-red-200 rounded-xl bg-red-50 shadow-sm p-6">
          <div className="flex items-center justify-center min-h-60">
            <div className="text-center">
              <h2 className="text-sm sm:text-base font-semibold text-red-700 mb-0.5">
                خطا در بارگذاری
              </h2>
              <p className="text-red-600 text-[10px] sm:text-xs">
                مشکلی در دریافت اطلاعات پیش آمده است
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!discountProducts.length) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6">
          <div className="flex items-center justify-center min-h-60">
            <div className="text-center">
              <div className="text-4xl mb-2">🏷️</div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-0.5">
                تخفیف ویژه‌ای یافت نشد
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-xs">
                در حال حاضر محصولی با تخفیف ویژه موجود نیست
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const carouselItems = [
    {
      type: "banner",
      id: "sale-banner",
      content: (
        <Link href="/sale" className="block h-full">
          <div className="p-1 sm:p-1.5 h-40 sm:h-50 md:h-60 flex items-center justify-center rounded-lg bg-[#D82F4E] w-full">
            <div className="flex flex-col items-center">
              <Image
                src="https://uploadkon.ir/uploads/a85309_25شگفت-انگیز.svg"
                alt="شگفت انگیز"
                width={60}
                height={60}
                className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 p-0!"
                unoptimized
              />
              <Image
                src="https://uploadkon.ir/uploads/180e09_25شگفت-انگیز-1.svg"
                alt="شگفت انگیز 1"
                width={70}
                height={30}
                className="w-12 sm:w-14 md:w-20"
                unoptimized
              />
              <h2 className="text-white text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-bold mt-1 sm:mt-2">
                مشاهده همه
              </h2>
            </div>
          </div>
        </Link>
      ),
    },
    ...discountProducts.slice(0, 14).map((product) => ({
      type: "product",
      id: product._id,
      content: (
        <Link href={`/product/${product._id}`} className="block h-full">
          <div className="rounded-xl bg-white hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
            <div className="p-1.5 sm:p-2 bg-white shrink-0">
              <Image
                src={product.media?.[0]?.url || defaultPlaceholder}
                alt={product.name}
                width={200}
                height={128}
                className="w-full h-16 sm:h-20 md:h-28 object-contain"
              />
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 pt-0 flex flex-col grow">
              <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-gray-800 line-clamp-2 min-h-6! sm:min-h-8!">
                {product.name}
              </h3>
              <div className="text-[6px] sm:text-[7px] md:text-[10px] text-gray-400 mt-0.5">
                {product.brand?.name || "برند"}
              </div>
              <div className="mt-auto pt-1">
                <div className="flex items-baseline justify-end gap-0.5 sm:gap-1">
                  <span className="text-[8px] sm:text-[10px] md:text-sm font-bold text-gray-900">
                    {(Number(product.sale) > 0
                      ? calcsale(product.price, product.sale)
                      : product.price
                    ).toLocaleString()}
                  </span>
                  <span className="text-[6px] sm:text-[7px] md:text-[10px] text-gray-500">
                    تومان
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5 sm:mt-1">
                  {Number(product.sale) > 0 ? (
                    <>
                      <span className="bg-[#D82F4E] text-white text-[6px] sm:text-[7px] md:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full">
                        {product.sale}%
                      </span>
                      <span className="text-[6px] sm:text-[7px] md:text-[10px] text-gray-400 line-through">
                        {product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <div className="invisible h-3 sm:h-4"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ),
    })),
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-20 xl:px-40 py-3 sm:py-4">
      <div className="bg-[#D82F4E] rounded-xl overflow-hidden">
        <div className="p-2 sm:p-3 md:p-4">
          <div className="w-full">
            <Carousel
              slidesPerView={1.5}
              spaceBetween={6}
                            breakpoints={{
                480: {
                  slidesPerView: 5,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 12,
                },
                1280: {
                  slidesPerView: 7,
                  spaceBetween: 14,
                },
              }}
            >
              {carouselItems.map((item) => (
                <div key={item.id}>{item.content}</div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}