"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";
import DeleteCategory from "./delete_category";
import UpdateCategoryButton from "./update_category_button";
import { Toaster } from "react-hot-toast";
import Accardion from "@/ui/accordion";

export default function CategoryList() {
  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/category");
      const js = await response.json();
      return js;
    },
  });
  if (isPending) {
    return <LoaderCircle className="m-[0_auto] " />;
  }
  return (
    <>
      <Toaster position="top-left" />

      {/* LOADING */}
      {isPending && (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-red-500" size={38} />
        </div>
      )}

      <div className="hidden lg:block">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 items-center px-8 py-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
            <div className="text-center">ID</div>
            <div className="text-center">IMAGE</div>
            <div className="text-center">EN NAME</div>
            <div className="text-center">NAME</div>
            <div className="text-center">ACTIONS</div>
          </div>

          {data?.length > 0 ? (
            data.map((category) => (
              <div
                key={category._id}
                className="
              grid
              grid-cols-5
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
                  {category._id.slice(-8)}
                </div>

                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={45}
                      height={45}
                    />
                  </div>
                </div>

                <div className="text-center text-gray-700 text-sm">
                  {category.en_name}
                </div>

                <div className="text-center font-medium text-gray-900">
                  {category.name}
                </div>

                <div className="flex justify-center gap-2 opacity-70 group-hover:opacity-100 transition">
                  <UpdateCategoryButton
                    id={category._id}
                    en_name={category.en_name}
                    name={category.name}
                    image={category.image}
                  />
                  <DeleteCategory id={category._id} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-gray-400">
              هیچ دسته‌بندی‌ای یافت نشد
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {data?.length > 0 ? (
          data.map((category) => (
            <Accardion
              key={category._id}
              title={category.name}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm"
              className02="flex gap-4 py-3"
            >
              {/* IMAGE */}
              <div className="w-fit flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={55}
                    height={55}
                  />
                </div>
              </div>

              {/* INFO */}
              <div className="flex flex-col gap-3 text-sm w-full">
                <div className="flex justify-between">
                  <span className="text-gray-500">ID</span>
                  <span className="text-gray-400 font-mono text-xs">
                    {category._id.slice(-8)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">EN</span>
                  <span className="text-gray-700">{category.en_name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">NAME</span>
                  <span className="text-gray-900 font-medium">
                    {category.name}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">ACTIONS</span>
                  <div className="flex gap-2">
                    <UpdateCategoryButton
                      id={category._id}
                      en_name={category.en_name}
                      name={category.name}
                      image={category.image}
                    />
                    <DeleteCategory id={category._id} />
                  </div>
                </div>
              </div>
            </Accardion>
          ))
        ) : (
          <div className="py-10 text-center text-gray-400">
            هیچ دسته‌بندی‌ای یافت نشد
          </div>
        )}
      </div>
    </>
  );
}
