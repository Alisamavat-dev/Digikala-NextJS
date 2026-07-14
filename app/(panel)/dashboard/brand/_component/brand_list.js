"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";
import DeleteBrand from "./delete_brand";
import UpdateBrandButton from "./update_brand_button";
import { Toaster } from "react-hot-toast";
import Accardion from "@/ui/accordion";

export default function BrandList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/brand");
      const js = await response.json();
      return js;
    },
  });
  if (isPending) {
    return <LoaderCircle className="m-[0_auto] " />;
  }
  return (
    <>
      {" "}
      <Toaster position="top-left" />
      {isPending && (
        <div className="flex justify-center py-16">
          <LoaderCircle size={36} className="animate-spin text-red-500" />
        </div>
      )}
      <div className="hidden lg:block">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
            <p className="w-40 text-center">ID</p>
            <p className="w-40 text-center">LOGO</p>
            <p className="w-40 text-center">NAME</p>
            <p className="w-40 text-center">ACTIONS</p>
          </div>

          {data?.length > 0 ? (
            data.map((brand) => (
              <div
                key={brand._id}
                className="
          flex
          items-center
          justify-between
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
                <div className="w-40 text-center text-xs text-gray-400 font-mono">
                  {brand._id.slice(-8)}
                </div>

                <div className="w-40 flex justify-center">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>

                <div className="w-40 text-center font-medium text-gray-800">
                  {brand.name}
                </div>

                <div className="w-40 flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition">
                  <UpdateBrandButton
                    id={brand._id}
                    name={brand.name}
                    logo={brand.logo}
                  />
                  <DeleteBrand id={brand._id} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400">
              هیچ برندی یافت نشد
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="space-y-4">
          {data?.length > 0 ? (
            data.map((brand) => (
              <Accardion
                key={brand._id}
                title={brand.name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm"
                className02="flex gap-4 py-3"
              >
                <div className="w-fit flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID</span>
                    <span className="text-gray-400 font-mono text-xs">
                      {brand._id.slice(-8)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="text-gray-800 font-medium">
                      {brand.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Actions</span>
                    <div className="flex gap-2">
                      <UpdateBrandButton
                        id={brand._id}
                        name={brand.name}
                        logo={brand.logo}
                      />
                      <DeleteBrand id={brand._id} />
                    </div>
                  </div>
                </div>
              </Accardion>
            ))
          ) : (
            <div className="py-10 text-center text-gray-400">
              هیچ برندی یافت نشد
            </div>
          )}
        </div>
      </div>
    </>
  );
}
