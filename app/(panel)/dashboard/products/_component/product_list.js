"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";

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
    return <LoaderCircle className="m-[0_auto] "/>;
  }
  return (
    <div className="w-[1100px] shadow-sm  rounded-[7px] overflow-hidden ">
      <div className="flex h-[40px] items-center justify-between bg-[#c0c0c036]  bg-gradient-to-r from-[#B31A39] via-[#ED1944] to-[#B31A39] px-[30px]   text-[11px] text-[#ffffffec] font-bold">
        <p className=" w-[160px]  flex justify-center ">ایدی</p>

        <p className=" w-[150px] text-[c0c0c036] flex justify-center ">عکس</p>
        <p className=" w-[150px] flex justify-center "> نام </p>
        <p className=" w-[150px] flex justify-center ">قیمت</p>
        <p className=" w-[150px] flex justify-center ">تخفیف</p>
        <p className=" w-[150px] flex justify-center ">نام دسته بندی</p>
        <p className=" w-[150px] flex justify-center ">نام برند</p>
        <p className=" w-[150px] flex justify-center ">
          <Settings size={18} />
        </p>
      </div>
      {data?.map((product) => {
        return (
          <div
            key={product._id}
            className=" flex  justify-center gap-[40px]  items-center p-[10px_50px] w-full border-b-1 border-[#c0c0c05f]  "
          >
            <div className="  !w-[100px]  text-[#070707]  w-[100px]   text-[12px] ">
              
              <p title={product._id} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]" >{product._id}</p>
            </div>
 <div className="   text-[#070707]  w-[110px]  flex justify-center  text-[12px] ">
              
            <Image src={product.media[0].url} alt={product.name} width={60} height={60} />
            </div>
            <div className="  !w-[100px] flex text-[#070707]  text-[12px]  w-[100px]  justify-center">
             
              <p title={product.name} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]">{product.name}</p>
            </div>
            <div className="  !w-[100px] flex text-[#070707] gap-3 text-[12px]  w-[100px]  flex justify-center">
             
              <p title={product.price} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]">{product.price}</p>
            </div>
            <div className="  !w-[100px] flex text-[#070707] gap-3 text-[12px] w-[100px]  flex justify-center">
             
              <p title={product.sale} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]">{product.sale}</p>
            </div>
             <div className="  !w-[100px] flex text-[#070707] gap-3 text-[12px] w-[100px]  flex justify-center">
             
              <p title={product.category.name} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]">{product.category.name}</p>
            </div>
            <div className="  !w-[100px] flex text-[#070707] gap-3 text-[12px] w-[100px]   flex justify-center">
             
              <p title={product.brand.name} className="w-[90px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px]">{product.brand.name}</p>
            </div>

            <div className="  !w-[100px]  w-[100px] flex  gap-[10px] pr-[5px] ">
                 {/* <UpdateCategoryButton
                id={category._id}
                en_name={category.en_name}
                name={category.name} 
                image={category.image}
              />
              <DeleteCategory id={category._id} /> */}
             
            </div>
          </div>
        );
      })}
    </div>
  );
}
