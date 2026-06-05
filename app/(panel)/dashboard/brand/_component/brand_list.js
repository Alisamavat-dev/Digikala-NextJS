"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";
import DeleteBrand from "./delete_brand";
import UpdateBrandButton from "./update_brand_button";

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
    return <LoaderCircle className="m-[0_auto] "/>;
  }
  return (
    <div className="w-[850px] shadow-sm  rounded-[7px] overflow-hidden ">
      <div className="flex h-[40px] items-center justify-between bg-[#c0c0c036]  bg-gradient-to-r from-[#B31A39] via-[#ED1944] to-[#B31A39] px-[30px]   text-[11px] text-[#ffffffec] font-bold">
        <p className=" w-[150px]  flex justify-center ">ایدی</p>

        <p className=" w-[150px] text-[c0c0c036] flex justify-center ">لوگو</p>
        <p className=" w-[150px] flex justify-center ">نام</p>
        <p className=" w-[150px] flex justify-center ">
          <Settings size={18} />
        </p>
      </div>
      {data?.map((brand) => {
        return (
          <div
            key={brand._id}
            className=" flex justify-between items-center px-[30px] w-[850px] border-b-1 border-[#c0c0c05f]  "
          >
            <div className="flex text-[#070707] flex justify-center  w-[150px] text-[12px]">
              {" "}
              <p>{brand._id}</p>
            </div>

            <Image src={brand.logo} alt={brand.name} width={60} height={60} />
            <div className="flex text-[#070707] gap-3 text-[12px]  w-[140px] flex justify-center">
              {" "}
              <p>{brand.name}</p>
            </div>
            <div className=" w-[110px] flex  gap-[10px] pr-[5px] ">
                 <UpdateBrandButton
                id={brand._id}
                name={brand.name} 
                logo={brand.logo}
              />
              <DeleteBrand id={brand._id} />
             
            </div>
          </div>
        );
      })}
    </div>
  );
}
