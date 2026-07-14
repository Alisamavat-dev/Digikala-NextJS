import Card from "@/ui/card";
import Carousel from "@/ui/carousel";
import { ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function Brands() {
  let brands = [];
  let error = null;

  try {
    const brandsRes = await fetch("http://localhost:4000/api/brand", {
      next: { revalidate: 3600 },
    });

    if (!brandsRes.ok) {
      throw new Error(`HTTP error! status: ${brandsRes.status}`);
    }

    const data = await brandsRes.json();
    brands = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching brands:", err);
    error = err.message;
  }

  const defaultPlaceholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7Ui111Q0ppxCJctMroRHTZyzWKB28EV8sg&s";

  if (error) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center min-h-60">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              خطا در بارگذاری
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              مشکلی در دریافت اطلاعات برندها پیش آمده است
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 text-sm font-medium"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center min-h-60">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              برندی یافت نشد
            </h2>
            <p className="text-sm text-gray-500">
              در حال حاضر برندی برای نمایش وجود ندارد
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
            <div className="flex-1"></div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                محبوب‌ترین برندها
              </h2>
              <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm shadow-red-500/25">
                {brands.length}
              </span>
            </div>
            <div className="flex-1 flex justify-end">
              <Link
                href="/brand"
                className="group flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-all duration-200 font-medium"
              >
                مشاهده همه
                <ChevronLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          </div>

          <div className="relative">
            <Carousel
              slidesPerView={2.5}
              spaceBetween={8}
              breakpoints={{
                480: { slidesPerView: 3.5, spaceBetween: 8 },
                640: { slidesPerView: 4.5, spaceBetween: 10 },
                768: { slidesPerView: 5.5, spaceBetween: 12 },
                1024: { slidesPerView: 6.5, spaceBetween: 12 },
                1280: { slidesPerView: 7.5, spaceBetween: 14 },
              }}
            >
              {brands.map((brand) => (
                <Link
                  key={brand._id || brand.id}
                  href={`/brand/${brand._id || brand.id}`}
                  className="block group"
                >
                  <div className="rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300">
                    <Card
                      title={brand.name || "برند"}
                      image={brand.logo || defaultPlaceholder}
                      titleClassName="w-full text-[8px] sm:text-[9px] md:text-[10px] font-medium text-gray-700 text-center py-2 px-0.5 truncate group-hover:text-red-500 transition-colors"
                      className="flex-col p-0! gap-0! rounded-none! shadow-none! bg-transparent"
                      imgClassName="p-0! w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 mx-auto object-contain bg-gray-50/50 my-2 sm:my-2.5 rounded-xl p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}