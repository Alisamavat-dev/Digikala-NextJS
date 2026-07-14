"use client";

import Link from "next/link";
import { ShoppingBag, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-6">
          <div className="text-[120px] md:text-[180px] font-black text-gray-200 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-linear-to-r from-red-500 to-pink-500 p-4 rounded-2xl shadow-lg shadow-red-500/25 animate-bounce">
              <ShoppingBag className="w-14 h-14 md:w-20 md:h-20 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          صفحه‌ای که دنبالش بودی پیدا نشد!
        </h1>

        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          ممکنه محصول حذف شده باشه، آدرس رو اشتباه وارد کرده باشی یا صفحه به جای دیگه‌ای منتقل شده باشه.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-pink-500 hover:shadow-lg hover:shadow-red-500/25 text-white rounded-xl font-medium transition-all duration-200 active:scale-95"
          >
            <Home className="w-5 h-5" />
            صفحه اصلی
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 hover:border-red-400 hover:text-red-500 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            برگشت به صفحه قبل
          </button>
        </div>

        {/* جستجوی سریع */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">
            یا می‌تونی از جستجو استفاده کنی:
          </p>
          <div className="max-w-sm mx-auto relative">
            <input
              type="text"
              placeholder="جستجو در فروشگاه..."
              className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition text-sm placeholder:text-gray-400"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-400">
            اگر فکر می‌کنی این خطا از سایته، با پشتیبانی تماس بگیر
            <Link
              href="/contact"
              className="text-red-500 hover:text-red-600 hover:underline mr-1 font-medium transition"
            >
              تماس با ما
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}