import ButtonShop from "@/ui/buttonShop";
import Carousel from "@/ui/carousel";
import calcSale from "@/utils/calcSale";
import {
  ShieldCheck,
  Truck,
  Undo2,
  Star,
  Heart,
  Share2,
  Check,
  ChevronLeft,
  ShoppingCart,
  Zap,
  Clock,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

export default async function Product({ params }) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    const response = await fetch(`http://localhost:4000/api/product/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    product = await response.json();
  } catch (err) {
    console.error("Error fetching product:", err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            خطا در بارگذاری محصول
          </h2>
          <p className="text-gray-500 mb-8">
            مشکلی در دریافت اطلاعات محصول پیش آمده است
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            محصولی یافت نشد
          </h2>
          <p className="text-gray-500 mb-8">
            محصول مورد نظر در سیستم وجود ندارد
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = product.sale
    ? calcSale(product.price, product.sale)
    : product.price;

  const getMediaUrl = (media) => {
    if (!media) return PLACEHOLDER_IMAGE;
    if (typeof media === "string") return media;
    return media.url || PLACEHOLDER_IMAGE;
  };

  let mediaList = [];
  if (product.media && Array.isArray(product.media)) {
    mediaList = product.media.filter(
      (item) => item && (typeof item === "string" || item.url),
    );
  }

  if (mediaList.length === 0) {
    mediaList = [{ _id: "default", url: PLACEHOLDER_IMAGE }];
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-500 transition flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              خانه
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/product" className="text-gray-500 hover:text-red-500 transition">
              محصولات
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium truncate max-w-50">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-10 p-6 md:p-8 lg:p-10">
            <div className="lg:w-1/2">
              <div className="sticky top-28">
                <div className="relative bg-linear-to-br from-gray-50 to-gray-100/50 rounded-3xl overflow-hidden border border-gray-200/50">
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    {product.sale && (
                      <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
                        {product.sale}% تخفیف
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-200/50">
                      جدید
                    </span>
                  </div>
                  <Carousel slidesPerView={1} navigation>
                    {mediaList.map((media, idx) => (
                      <div
                        key={media._id || idx}
                        className="w-full flex items-center justify-center h-80 sm:h-96 lg:h-120 bg-white"
                      >
                        <Image
                          src={getMediaUrl(media)}
                          alt={`${product.name} - تصویر ${idx + 1}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-contain p-6"
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>

                {mediaList.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center flex-wrap">
                    {mediaList.map((media, index) => (
                      <div
                        key={media._id || index}
                        className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-gray-200 transition-all duration-300 cursor-pointer bg-white"
                      >
                        <Image
                          src={getMediaUrl(media)}
                          alt={`thumbnail ${index}`}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full p-1.5"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/2">
              {product.brand?.name && (
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-red-50 to-pink-50 text-red-600 text-xs px-4 py-1.5 rounded-full mb-4 font-medium border border-red-100/50">
                  <Award className="w-3.5 h-3.5" />
                  {product.brand.name}
                </div>
              )}

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-sm mb-6 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100/50">
                  <span className="text-green-700 font-bold">4.8</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-green-600 text-xs">(۴۴۴ نظر)</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="font-semibold text-gray-700">۱۲۳</span>
                  <span className="text-xs">پرسش</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="font-semibold text-gray-700">۲٫۵k</span>
                  <span className="text-xs">فروش</span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200/80 py-6 my-5">
                {product.sale ? (
                  <>
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500">
                        {finalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">تومان</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-red-500/20">
                        {product.sale}% تخفیف ویژه
                      </div>
                      <div className="text-gray-400 line-through text-sm">
                        {product.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">تومان</div>
                      <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1 rounded-full">
                        <Zap className="w-3.5 h-3.5" />
                        {Math.round((product.sale / product.price) * 100)}% صرفه‌جویی
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                      {product.price?.toLocaleString() || "۰"}
                    </span>
                    <span className="text-sm text-gray-500">تومان</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-gray-700 bg-linear-to-r from-gray-50 to-white p-3.5 rounded-2xl border border-gray-100/50">
                  <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>گارانتی اصالت و سلامت</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700 bg-linear-to-r from-gray-50 to-white p-3.5 rounded-2xl border border-gray-100/50">
                  <Truck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>ارسال رایگان بالای ۵۰۰ هزار</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700 bg-linear-to-r from-gray-50 to-white p-3.5 rounded-2xl border border-gray-100/50">
                  <Undo2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <span>بازگشت ۷ روزه</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700 bg-linear-to-r from-gray-50 to-white p-3.5 rounded-2xl border border-gray-100/50">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>تحویل اکسپرس ۲۴ ساعته</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-semibold">
                    موجود در انبار
                  </span>
                  <span className="text-xs text-green-600 bg-white/50 px-2 py-0.5 rounded-full">
                    تحویل امروز
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  ارسال امروز - تحویل ۲ تا ۴ روز کاری
                </p>
              </div>

              <ButtonShop maxQuantity={10} />

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button className="flex-1 bg-linear-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30 text-white font-bold py-4 rounded-2xl transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2 text-base">
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </button>
                <button className="w-14 h-14 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all duration-300 cursor-pointer">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-14 h-14 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all duration-300 cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>ضمانت قیمت</span>
                  </div>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-500" />
                    <span>پرداخت امن</span>
                  </div>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-purple-500" />
                    <span>تحویل اکسپرس</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="border-b border-gray-200/50">
            <div className="flex gap-8 px-8 overflow-x-auto">
              <button className="py-5 text-red-500 border-b-2 border-red-500 font-semibold whitespace-nowrap text-sm relative">
                توضیحات محصول
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-500 to-pink-500 rounded-full"></span>
              </button>
              <button className="py-5 text-gray-500 hover:text-gray-800 font-medium whitespace-nowrap text-sm transition">
                مشخصات فنی
              </button>
              <button className="py-5 text-gray-500 hover:text-gray-800 font-medium whitespace-nowrap text-sm transition">
                نظرات (0)
              </button>
              <button className="py-5 text-gray-500 hover:text-gray-800 font-medium whitespace-nowrap text-sm transition">
                پرسش و پاسخ
              </button>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed text-sm max-w-4xl">
              {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}