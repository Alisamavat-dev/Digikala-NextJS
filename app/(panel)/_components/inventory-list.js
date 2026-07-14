"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function StatsCard() {
  const {
    data: brands = [],
    isLoading: brandsLoading,
    error: brandsError,
  } = useQuery({
    queryKey: ["brands-count"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/brand/", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت برندها");
      }

      return res.json();
    },
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products-count"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/product/", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت محصولات");
      }

      return res.json();
    },
  });

  if (brandsLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-12 h-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (brandsError || productsError) {
    return (
      <div className="text-center py-12 text-red-500 bg-red-50 rounded-2xl p-8">
        <p className="font-medium">خطا در بارگذاری آمار</p>
        <p className="text-sm mt-1">
          {brandsError?.message || productsError?.message}
        </p>
      </div>
    );
  }

  const brandsCount = brands.length;
  const productsCount = products.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-4">
      <div
        className="
          relative
          overflow-hidden
          bg-white
          rounded-3xl
          p-8
          border
          border-gray-100
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
          hover:-translate-y-1
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
        "
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 to-pink-500" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-3">
              تعداد برندها
            </p>

            <h2 className="text-5xl font-black text-gray-900">{brandsCount}</h2>
          </div>

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-red-50
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            🏷️
          </div>
        </div>
      </div>

      <div
        className="
          relative
          overflow-hidden
          bg-white
          rounded-3xl
          p-8
          border
          border-gray-100
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
          hover:-translate-y-1
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
        "
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-cyan-500" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-3">
              تعداد محصولات
            </p>

            <h2 className="text-5xl font-black text-gray-900">
              {productsCount}
            </h2>
          </div>

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-blue-50
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            📦
          </div>
        </div>
      </div>
    </div>
  );
}
