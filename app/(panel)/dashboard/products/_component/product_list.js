"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Update from "../update/_component/Products_update_btn";
import DeleteProduct from "./product_delete-button";
import Carousel from "@/ui/carousel";
import { Toaster } from "react-hot-toast";
import Accardion from "@/ui/accordion";

export default function ProductList() {
  const { data, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/product");
      const js = await response.json();
      return js;
    },
  });

  if (isPending) {
    return <LoaderCircle className="m-[0_auto] " />;
  }

  const safeData = Array.isArray(data) ? data : [];

  return (
    <>
      <Toaster position="top-left" />

      {isPending && (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-red-500" size={38} />
        </div>
      )}

      <div className="hidden lg:block">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="grid grid-cols-8 items-center px-8 py-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
            <div className="text-center">ID</div>
            <div className="text-center">IMAGE</div>
            <div className="text-center">NAME</div>
            <div className="text-center">PRICE</div>
            <div className="text-center">SALE</div>
            <div className="text-center">CATEGORY</div>
            <div className="text-center">BRAND</div>
            <div className="text-center">ACTIONS</div>
          </div>

          {safeData.length > 0 ? (
            safeData.map((product) => {
              const safeProduct = {
                ...product,
                _id: product?._id || "—",
                name: product?.name || "—",
                price: product?.price || 0,
                sale: product?.sale || 0,
                category: product?.category || { name: "—" },
                brand: product?.brand || { name: "—" },
                media: Array.isArray(product?.media) ? product.media : [],
              };

              return (
                <div
                  key={safeProduct._id}
                  className="
                    grid
                    grid-cols-8
                    items-center
                    px-8
                    py-4
                    border-b
                    border-gray-100
                    hover:bg-gray-50
                    transition-all
                    duration-200
                    group
                  "
                >
                  <div className="text-center text-xs font-mono text-gray-400">
                    {safeProduct._id.slice(-8)}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      {safeProduct.media.length > 0 ? (
                        <Image
                          src={safeProduct.media[0]?.url || "/placeholder.jpg"}
                          alt={safeProduct.name}
                          width={45}
                          height={45}
                        />
                      ) : (
                        <Image
                          src="/placeholder.jpg"
                          alt="no image"
                          width={45}
                          height={45}
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center text-sm font-medium text-gray-900 truncate px-2">
                    {safeProduct.name}
                  </div>

                  <div className="text-center text-sm text-gray-700">
                    {safeProduct.price.toLocaleString()} تومان
                  </div>

                  <div className="text-center text-sm text-gray-700">
                    {safeProduct.sale}%
                  </div>

                  <div className="text-center text-sm text-gray-700 truncate px-2">
                    {safeProduct.category.name}
                  </div>

                  <div className="text-center text-sm text-gray-700 truncate px-2">
                    {safeProduct.brand.name}
                  </div>

                  <div className="flex justify-center gap-2 opacity-70 group-hover:opacity-100 transition">
                    <Update id={safeProduct._id} />
                    <DeleteProduct id={safeProduct._id} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-gray-400">
              هیچ محصولی یافت نشد
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {safeData.length > 0 ? (
          safeData.map((product) => {
            const safeProduct = {
              ...product,
              _id: product?._id || "—",
              name: product?.name || "—",
              price: product?.price || 0,
              sale: product?.sale || 0,
              category: product?.category || { name: "—" },
              brand: product?.brand || { name: "—" },
              media: Array.isArray(product?.media) ? product.media : [],
            };

            return (
              <Accardion
                key={safeProduct._id}
                title={safeProduct.name}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm"
                className02="flex gap-4 py-3"
              >
                <div className="w-fit flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    {safeProduct.media.length > 0 ? (
                      <Image
                        src={safeProduct.media[0]?.url || "/placeholder.jpg"}
                        alt={safeProduct.name}
                        width={55}
                        height={55}
                      />
                    ) : (
                      <Image
                        src="/placeholder.jpg"
                        alt="no image"
                        width={55}
                        height={55}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID</span>
                    <span className="text-gray-400 font-mono text-xs">
                      {safeProduct._id.slice(-8)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">PRICE</span>
                    <span className="text-gray-700">
                      {safeProduct.price.toLocaleString()} تومان
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">SALE</span>
                    <span className="text-gray-700">
                      {safeProduct.sale}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">CATEGORY</span>
                    <span className="text-gray-700">
                      {safeProduct.category.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">BRAND</span>
                    <span className="text-gray-700">
                      {safeProduct.brand.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">ACTIONS</span>
                    <div className="flex gap-2">
                      <Update id={safeProduct._id} />
                      <DeleteProduct id={safeProduct._id} />
                    </div>
                  </div>
                </div>
              </Accardion>
            );
          })
        ) : (
          <div className="py-10 text-center text-gray-400">
            هیچ محصولی یافت نشد
          </div>
        )}
      </div>
    </>
  );
}