"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";
import DeleteCategory from "./delete_category";
import UpdateCategoryButton from "./update_category_button";

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
    <div className="w-[950px] shadow-sm  rounded-[7px] overflow-hidden ">
      <div className="flex h-[40px] items-center justify-between bg-[#c0c0c036]  bg-gradient-to-r from-[#B31A39] via-[#ED1944] to-[#B31A39] px-[30px]   text-[11px] text-[#ffffffec] font-bold">
        <p className=" w-[160px]  flex justify-center ">ایدی</p>

        <p className=" w-[150px] text-[c0c0c036] flex justify-center ">عکس</p>
        <p className=" w-[150px] flex justify-center "> نام لاتین</p>
        <p className=" w-[150px] flex justify-center ">نام</p>
        <p className=" w-[150px] flex justify-center ">
          <Settings size={18} />
        </p>
      </div>
      {data?.map((category) => {
        return (
          <div
            key={category._id}
            className=" flex justify-between items-center px-[30px] w-[950px] border-b-1 border-[#c0c0c05f]  "
          >
            <div className="flex text-[#070707] flex justify-center  w-[150px] text-[12px] mr-[10px]">
              <p>{category._id}</p>
            </div>

            <Image
              src={category.image}
              alt={category.name}
              width={60}
              height={60}
            />
            <div className="flex text-[#070707]  text-[12px]  w-[120px] mr-[15px]  justify-center">
              <p>{category.en_name}</p>
            </div>
            <div className="flex text-[#070707] gap-3 text-[12px]  w-[100px] ml-[22px]  flex justify-center">
              <p>{category.name}</p>
            </div>

            <div className=" w-[110px] flex  gap-[10px] pr-[5px] ">
              <UpdateCategoryButton
                id={category._id}
                en_name={category.en_name}
                name={category.name}
                image={category.image}
              />
              <DeleteCategory id={category._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
