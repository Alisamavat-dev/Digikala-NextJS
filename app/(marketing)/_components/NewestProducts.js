import Card from "@/ui/card";
import Carousel from "@/ui/carousel";
import calcSale from "@/utils/calcSale";
import { ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const defaultPlaceholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7Ui111Q0ppxCJctMroRHTZyzWKB28EV8sg&s";

const getProductImage = (product) => {
  if (product.media?.length > 0) {
    const validMedia = product.media.find(
      (m) => m.url && !m.url.startsWith("data:image"),
    );
    return validMedia?.url || product.media[0]?.url || defaultPlaceholder;
  }
  return product.image || defaultPlaceholder;
};

export default async function NewestProducts() {
  let products = [];
  let brands = [];
  let error = null;

  try {
    const [productsRes, brandsRes] = await Promise.all([
      fetch("http://localhost:4000/api/product", {
        next: { revalidate: 3600 },
      }),
      fetch("http://localhost:4000/api/brand", { next: { revalidate: 3600 } }),
    ]);

    if (!productsRes.ok || !brandsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const productsData = await productsRes.json();
    const brandsData = await brandsRes.json();

    products = Array.isArray(productsData) ? productsData : [];
    brands = Array.isArray(brandsData) ? brandsData : [];
  } catch (err) {
    console.error("Error fetching products:", err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center min-h-60">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              خطا در بارگذاری
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              مشکلی در دریافت اطلاعات محصولات پیش آمده است
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

  if (!products?.length) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center min-h-60">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              محصولی وجود ندارد
            </h2>
            <p className="text-sm text-gray-500">
              متاسفانه هیچ محصولی برای نمایش یافت نشد
            </p>
          </div>
        </div>
      </div>
    );
  }

  const newestProducts = products.slice(0, 10);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-linear-to-b from-red-500 to-pink-500 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                محصولات جدید
              </h2>
              <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm shadow-red-500/25">
                جدید
              </span>
            </div>
            <Link
              href="/product"
              className="group flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-all duration-200 font-medium"
            >
              مشاهده همه
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>

          <div className="relative">
            <Carousel
              slidesPerView={2.2}
              spaceBetween={12}
              breakpoints={{
                480: { slidesPerView: 2.5, spaceBetween: 12 },
                640: { slidesPerView: 3, spaceBetween: 14 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 18 },
                1280: { slidesPerView: 6, spaceBetween: 20 },
              }}
            >
              {newestProducts.map((product) => {
                const hasDiscount = Number(product.sale) > 0;
                const finalPrice = hasDiscount
                  ? calcSale(product.price, product.sale)
                  : product.price;

                return (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="block group"
                  >
                    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-red-200 hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-gray-50/50 group-hover:bg-gray-50 transition">
                        <Image
                          src={getProductImage(product)}
                          alt={product.name || "محصول"}
                          width={200}
                          height={128}
                          className="w-full h-28 sm:h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                          unoptimized={getProductImage(product).startsWith(
                            "data:",
                          )}
                        />
                      </div>
                      <div className="p-3 pt-2">
                        <h3 className="text-[10px] sm:text-xs font-medium text-gray-800 line-clamp-2 min-h-8 group-hover:text-red-500 transition">
                          {product.name}
                        </h3>
                        <div className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
                          {product.brand?.name || "برند"}
                        </div>
                        <div className="mt-1.5">
                          <div className="flex justify-end items-baseline gap-1">
                            <p className="text-xs sm:text-sm font-bold text-gray-900">
                              {finalPrice.toLocaleString()}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-gray-500">
                              تومان
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            {hasDiscount ? (
                              <>
                                <p className="bg-linear-to-r from-red-500 to-pink-500 text-white text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-sm shadow-red-500/25">
                                  {product.sale}%
                                </p>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 line-through">
                                  {product.price.toLocaleString()}
                                </p>
                              </>
                            ) : (
                              <div className="invisible h-4"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}