"use client";

import { useQuery } from "@tanstack/react-query";

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (brandsError || productsError) {
    return (
      <div className="text-center py-12 text-red-600">
        خطا در بارگذاری آمار: {brandsError?.message || productsError?.message}
      </div>
    );
  }

  const brandsCount = brands.length;
  const productsCount = products.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto p-4">
      {/* کارت برندها */}
      <div className="bg-[#ED1944]  rounded-2xl p-6 flex flex-col items-center justify-center">
        <p className=" text-sm font-medium uppercase tracking-wider mb-2">
          تعداد برندها
        </p>
        <p className="text-5xl lg:text-6xl font-bold tracking-tight">
          {brandsCount}
        </p>
      </div>

      {/* کارت محصولات */}
      <div className="bg-[#ED1944]  rounded-2xl p-6 flex flex-col items-center justify-center">
        <p className=" text-sm font-medium uppercase tracking-wider mb-2">
          تعداد محصولات
        </p>
        <p className="text-5xl lg:text-6xl font-bold tracking-tight">
          {productsCount}
        </p>
      </div>
    </div>
  );
}
